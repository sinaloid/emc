<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Filtre;
use App\Models\MediaProduit;
use App\Models\MediaProduitOption;

class MediaProduitOptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MediaProduitOption::where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune option trouvée'], 404);
        }

        return response()->json(['message' => 'Options récupérées', 'data' => $data], 200);
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
            'mediaProduit' => 'required|string|max:8',
            'filtre' => 'required|string|max:8',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        
        $mediaProduit = MediaProduit::where('slug',$request->mediaProduit)->where("is_deleted",false)->first();
        
        if (!$mediaProduit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $filtre = Filtre::where('slug',$request->filtre)->where("is_deleted",false)->first();
        
        if (!$filtre) {
            return response()->json(['message' => 'Filtre non trouvé'], 404);
        }
        
        $data = MediaProduitOption::create([
            'media_produit_id' => $mediaProduit->id,
            'filtre_id' => $filtre->id,
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);

        return response()->json(['message' => 'Option créée avec succès', 'data' => $data], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = MediaProduitOption::where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Option non trouvée'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Option supprimée'], 404);
        }

        return response()->json(['message' => 'Option trouvée', 'data' => $data], 200);
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
            'mediaProduit' => 'required|string|max:8',
            'filtre' => 'required|string|max:8',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $mediaProduit = MediaProduit::where('slug',$request->mediaProduit)->where("is_deleted",false)->first();
        
        if (!$mediaProduit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $filtre = Filtre::where('slug',$request->filtre)->where("is_deleted",false)->first();
        
        if (!$filtre) {
            return response()->json(['message' => 'Filtre non trouvé'], 404);
        }

        $data = MediaProduitOption::where('slug',$slug)->where("is_deleted",false)->first();
        
        if (!$data) {
            return response()->json(['message' => 'Option non trouvé'], 404);
        }
        
        $data->update([
            'media_produit_id' => $mediaProduit->id,
            'filtre_id' => $filtre->id, 
        ]);


        return response()->json(['message' => 'Option modifiée avec succès', 'data' => $data], 200);

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
        $data = MediaProduitOption::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Option non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Option supprimée avec succès']);
    }
}