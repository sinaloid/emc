<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Campagne;
use App\Models\Devis;
use App\Models\DevisDoc;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendDevis;

class DevisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Devis::where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun devis trouvé'], 404);
        }

        return response()->json(['message' => 'Devis récupérés', 'data' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Vérifier que les champs obligatoires sont remplis
       
        $validator = Validator::make($request->all(), [
            'campagne' => 'required|string|max:8',
            'price' => 'nullable|string|max:255',
            'description' => 'required|string|max:1000',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        
        $campagne = Campagne::where('slug',$request->campagne)->where("is_deleted",false)->first();
        //dd($campagne);
        if (!$campagne) {
            return response()->json(['message' => 'Campagne non trouvée'], 404);
        }

        
       /**INfos clients */

       $user = $campagne->user()->first();
       if (!$user) {
           return response()->json(['message' => "Le client n'a pas été trouvé"], 404);
       }

       /**Infos produit campagne */

        $mediaProduits = $campagne->publicites()->first();

        if (!$mediaProduits) {
            return response()->json(['message' => 'Produit non trouvée'], 404);
        }
        $mediaProduits = $campagne->publicites()->get();
        $price = 0;
        $details = [];

        

        foreach($mediaProduits as $mediaProduit){
            $element = $mediaProduit->mediaProduit()->first();
            if($element){
                array_push($details,[
                    "name" =>$element->name,
                    "price" =>$element->price,
                    "media" =>$element->media()->first()->name,
                    "categorie" =>$element->media()->first()->categorieMedia()->first()->name,
                ]);
                //$price = $element->price + $price;
            }
        }
        

        $data = Devis::create([
            'campagne_id' => $campagne->id,
            //'price' => $price,
            "price" =>"En attente",
            'description' => $request->description,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'status' => false,
            'is_deleted' => false,
            'slug' => Str::random(8),
            'reference' => 'DEV-' . date('YmdHis')
        ]);
        //dd("ok");
        $pdf = Pdf::loadView('devis', compact('user','data','details'));
        //return $pdf->download();
        
        // Générez un nom de fichier unique pour le PDF
        $pdfPath = 'pdf/devis/devis-pdf-' . time() . '.pdf';

        // Enregistrez le fichier PDF sur le disque
        $output = $pdf->output();
        file_put_contents($pdfPath, $output);

        $doc = DevisDoc::create([
            'name' => $pdfPath,
            'url' => $pdfPath,
            'slug' => Str::random(8),
            'devis_id' => $data->id,
        ]);
        //dd($pdfPath);

        

        $this->sendEmail($user->email,$pdfPath);
        
        

        return response()->json(['message' => 'Devis créé avec succès', 'data' => $data], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Devis::with("devisDocs")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Devis non trouvée'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Devis supprimée'], 404);
        }

        return response()->json(['message' => 'Devis trouvée', 'data' => $data], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        // Vérifier que les champs obligatoires sont remplis
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|max:8',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }


        $data = Devis::where('slug',$slug)->where("is_deleted",false)->first();
        
        if (!$data) {
            return response()->json(['message' => 'Devis non trouvée'], 404);
        }
        
        $data->update([
            'status' => $request->status,
        ]);


        return response()->json(['message' => 'Devis modifiée avec succès', 'data' => $data], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        // Trouver la catégorie de maison à supprimer
        $data = Devis::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Devis non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Devis supprimé avec succès']);
    }

    public function sendEmail($email,$file)
    {
      $data = [
        'subject' => "Devis",
        'title' => "Merci d'avoir demande un devis sur EMC",
        'content' => 'veuillez trouver votre devis en piece jointe '
      ];

      Mail::to($email)->send(new SendDevis($data,$file));

      return "E-mail envoyé avec succès.";
    }

    public function storeFile(Request $request){
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:8',
            'price' => 'nullable|string|max:255',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        //dd($request["files"]);
        $data = Devis::where('slug',$request->slug)->where("is_deleted",false)->first();
        //dd($email = $data->campagne()->first()->user()->first()->email);
        if (!$data) {
            return response()->json(['message' => 'Devis non trouvée'], 404);
        }

        if ($request->hasFile('files')) {
            $files = $request["files"];
           // dd($files);
            foreach($files as $file){
               // dd($file);
                // Générer un nom aléatoire pour l'image
                $fileName = 'devis-pdf-' . time() . '.' . $file->getClientOriginalExtension();

                // Enregistrer l'image dans le dossier public/images
                $filePath = $file->move(public_path('pdf/devis'), $fileName);

                if ($filePath) {
                    // Créer la nouvelle catégorie de média
                    $doc = DevisDoc::create([
                        'name' => $fileName,
                        'url' => 'pdf/devis/' . $fileName,
                        'slug' => Str::random(8),
                        'devis_id' => $data->id,
                    ]);
                    $email = $data->campagne()->first()->user()->first()->email;

                    $this->sendEmail($email,'pdf/devis/' . $fileName);
                    $data->update([
                        "price" => $request->price
                    ]);
                    /*if ( !$doc) {
                        return response()->json(['error' => 'Échec lors de la création'], 422);
                    }*/
                    //$filePath = 'messages/' . $fileName;
                }
            }
            return response()->json(['message' => 'Fichiers ajoutés avec succès'], 200);
            
        }
        return response()->json(['error' => 'Échec lors de la création'], 422);

    }
}