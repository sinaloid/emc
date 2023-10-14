<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\MediaProduit;
use App\Models\CategorieMedia;
use App\Models\Media;

class MediaProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($slug = "")
    {
        if($slug != ""){
            //$data = MediaProduit::with("media","media.categorieMedia")->where("is_deleted", false)->get();
            /*$data = MediaProduit::with([
                'media.categorieMedia' => function ($query) use ($slug) {
                    //dd($slug);
                // Utilisez la clause where pour filtrer les articles par titre.
                //$query->where('slug', $slug)->get();
            }])->get();*/
            $data = MediaProduit::whereHas('media.categorieMedia', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })->with("media","media.categorieMedia")->get();
        }else{
            $data = MediaProduit::with("media","media.categorieMedia")->where("is_deleted", false)->get();
        }

        if ($data->isEmpty()) {
           // return response()->json(['message' => 'Aucune produit trouvé','data' => []], 404);
        }

        return response()->json(['message' => 'Prouits récupérés', 'data' => $data], 200);
    }

    public function produitByMedia($slug = "")
    {
        if($slug != ""){
            
            $data = MediaProduit::whereHas('media', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })->with("media","media.categorieMedia")->get();
        }else{
            $data = MediaProduit::with("media","media.categorieMedia")->where("is_deleted", false)->get();
        }

        if ($data->isEmpty()) {
           // return response()->json(['message' => 'Aucune produit trouvé','data' => []], 404);
        }

        return response()->json(['message' => 'Prouits récupérés', 'data' => $data], 200);
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
            'price' => 'required|string|max:255',
            'media' => 'required|string|max:8',
            'description' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $media = Media::where("slug", $request->media)->first();

        if (!$media) {
            return response()->json(['message' => 'Media non trouvée'], 404);
        }
        
        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('produits'), $imageName);

            if ($imagePath) {
                // Créer la nouvelle catégorie de média
                $data = MediaProduit::create([
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'price' => $request->input('price'),
                    'is_deleted' => false,
                    'slug' => Str::random(8),
                    'media_id' => $media->id,
                    'image' => 'produits/' . $imageName,
                ]);

                if ($data) {
                    return response()->json(['message' => 'Produit créé avec succès', 'data' => $data], 200);
                }
            }
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
        $data = MediaProduit::with("media","media.mediaProduits")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Produit supprimé'], 404);
        }

        return response()->json(['message' => 'Produit trouvé', 'data' => $data], 200);
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
            'price' => 'required|string|max:255',
            'media' => 'required|string|max:8',
            'description' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $media = Media::where("slug", $request->media)->first();

        if (!$media) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }

        $data = MediaProduit::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }

        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('produits'), $imageName);

            if ($imagePath) {
                // Créer la nouvelle catégorie de média
                Storage::delete($data->image);
                $data->update([
                    'name' => $request->input('name'),
                    'price' => $request->input('price'),
                    'description' => $request->input('description'),
                    'image' => 'produits/' . $imageName,
                    'media_id' => $media->id,
                ]);
            }
        }else {
            $data->update([
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'description' => $request->input('description'),
                'media_id' => $media->id,
            ]);
                
        }

        return response()->json(['message' => 'Produit modifié avec succès', 'data' => $data], 200);

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
        $data = MediaProduit::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Media supprimé avec succès']);
    }
}