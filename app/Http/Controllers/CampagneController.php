<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\CategorieMedia;
use App\Models\Media;
use App\Models\Campagne;
use App\Models\CampagneDoc;

class CampagneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Campagne::where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune campagne trouvé'], 404);
        }

        return response()->json(['message' => 'Campagnes récupérées', 'data' => $data], 200);
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            //'startDate' => 'required|date',
            //'endDate' => 'required|date',
            'status' => 'required|string|max:255',
            //'file' => 'nullable|file|max:10000',
            //'budget' => 'required|string|max:255',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        
        $user = Auth::user();
        //dd($user);
        $data = Campagne::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            //'startDate' => $request->input('startDate'),
            //'endDate' => $request->input('endDate'),
            'status' => 0, //$request->input('status'),
            //'budget' => $request->input('budget'),
            'is_deleted' => false,
            'slug' => Str::random(8),
            'user_id' => isset($user) ? $user->id : $request->input("user_id"),
        ]);

        //$res = $this->storeFile($data,$request);

        //dd($request->all());

        /*if ($request->hasFile('file')) {
            // Générer un nom aléatoire pour l'image
            $fileName = Str::random(10) . '.' . $request->file->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $filePath = $request->file->move(public_path('files'), $fileName);

            if ($filePath) {
                // Créer la nouvelle catégorie de média
                $data->update([
                    'file' => 'files/' . $fileName,
                ]);
            }
        }*/

        if ($data) {
            return response()->json(['message' => 'Campagne créé avec succès', 'data' => $data], 200);
        }

        return response()->json(['error' => 'Échec lors de la création'], 422);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Campagne::with("campagneDocs")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Campagne non trouvée'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Campagne supprimée'], 404);
        }

        return response()->json(['message' => 'Campagne trouvée', 'data' => $data], 200);
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            //'startDate' => 'required|date',
            //'endDate' => 'required|date',
            'status' => 'required|string|max:255',
            //'file' => 'nullable|file|max:10000',
            //'budget' => 'required|string|max:255',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $data = Campagne::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Campagne non trouvée'], 404);
        }

        $data->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            //'startDate' => $request->input('startDate'),
            //'endDate' => $request->input('endDate'),
            'status' => $request->input('status'),
            //'budget' => $request->input('budget'),
        ]);

        /*if ($request->hasFile('file')) {
            // Générer un nom aléatoire pour l'image
            $fileName = Str::random(10) . '.' . $request->file->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $filePath = $request->file->move(public_path('files'), $fileName);

            if ($filePath) {
                // Créer la nouvelle catégorie de média
                Storage::delete($data->file);
                $data->update([
                    'file' => 'files/' . $fileName,
                ]);
            }
        }*/

        return response()->json(['message' => 'Campagne modifiée avec succès', 'data' => $data], 200);

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
        $data = Campagne::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Campagne non trouvée'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Campagne supprimée avec succès']);
    }

    public function getFile ()
    {
        $data = $user = Auth::user()->with("campagnes.publicites.publiciteDocs", "campagnes.devis.devisDocs", "messages.messageDocs")->first();
        //dd($data);
        if (!$data) {
            return response()->json(['message' => 'Aucune campagne trouvé'], 404);
        }

        return response()->json(['message' => 'Campagnes récupérées', 'data' => $data], 200);
    }

    public function storeFile($data, $request){
        //return dd($request["files"]);

        if ($request->hasFile('files')) {
            $files = $request["files"];
           // dd($files);
            foreach($files as $file){
               // dd($file);
                // Générer un nom aléatoire pour l'image
                $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();

                // Enregistrer l'image dans le dossier public/images
                $filePath = $file->move(public_path('campagnes'), $fileName);

                if ($filePath) {
                    // Créer la nouvelle catégorie de média
                    $doc = CampagneDoc::create([
                        'name' => $fileName,
                        'url' => 'campagnes/' . $fileName,
                        'slug' => Str::random(8),
                        'campagne_id' => $data->id,
                    ]);

                    /*if ( !$doc) {
                        return response()->json(['error' => 'Échec lors de la création'], 422);
                    }*/
                    //$filePath = 'messages/' . $fileName;
                }
            }
            return response()->json(['message' => 'Fichiers ajoutés avec succès'], 200);
            
        }

        return response()->json(['message' => 'Faill'], 200);


    }
}