<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\CategorieFiltre;
use App\Models\Filtre;

class FiltreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Filtre::with("categorieFiltre")->where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun filtre trouvée'], 404);
        }

        return response()->json(['message' => 'Filtres récupérés', 'data' => $data], 200);
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
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $categorie = CategorieFiltre::where('slug',$request->categorie)->where("is_deleted",false)->first();
        
        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $data = Filtre::create([
            'name' => $request->input('name'),
            'categorie_filtre_id' => $categorie->id,
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);

        return response()->json(['message' => 'Filtre créé avec succès', 'data' => $data], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Filtre::with("categorieFiltre")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Filtre non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Filtre supprimé'], 404);
        }

        return response()->json(['message' => 'Filtre trouvé', 'data' => $data], 200);
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
            'categorie' => 'required|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $categorie = CategorieFiltre::where('slug',$request->categorie)->where("is_deleted",false)->first();
        
        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $data = Filtre::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Filtre non trouvé'], 404);
        }

        $data->update([
            'name' => $request->input('name'),
            'categorie_filtre_id' => $categorie->id,
        ]);

        return response()->json(['message' => 'Filtre modifié avec succès', 'data' => $data], 200);

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
        $data = Filtre::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Filtre non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Filtre supprimé avec succès']);
    }
}