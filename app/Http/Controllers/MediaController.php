<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\CategorieMedia;
use App\Models\Media;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Media::with("categorieMedia","mediaTarifs")->where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune media trouvé'], 404);
        }

        return response()->json(['message' => 'Medias récupérés', 'data' => $data], 200);
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
            'categorie' => 'required|string|max:8',
            'description' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $categorie = CategorieMedia::where("slug", $request->categorie)->first();

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        
        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('medias'), $imageName);

            if ($imagePath) {
                // Créer la nouvelle catégorie de média
                $data = Media::create([
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'is_deleted' => false,
                    'slug' => Str::random(8),
                    'user_id' => Auth::user()->id,
                    'categorie_media_id' => $categorie->id,
                    'image' => 'medias/' . $imageName,
                ]);

                if ($data) {
                    return response()->json(['message' => 'Media créé avec succès', 'data' => $data], 200);
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
        $data = Media::with("categorieMedia","mediaTarifs")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Media supprimé'], 404);
        }

        return response()->json(['message' => 'Media trouvé', 'data' => $data], 200);
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
            'categorie' => 'required|string|max:8',
            'description' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $categorie = CategorieMedia::where("slug", $request->categorie)->first();

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $data = Media::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }

        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('medias'), $imageName);

            if ($imagePath) {
                // Créer la nouvelle catégorie de média
                Storage::delete($data->image);
                $data->update([
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'image' => 'medias/' . $imageName,
                    'categorie_media_id' => $categorie->id,
                ]);
            }
        }else {
            $data->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'categorie_media_id' => $categorie->id,
            ]);
                
        }

        return response()->json(['message' => 'Media modifié avec succès', 'data' => $data], 200);

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
        $data = Media::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Media supprimé avec succès']);
    }
}