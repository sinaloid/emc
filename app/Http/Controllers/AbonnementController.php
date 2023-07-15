<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\CategorieAbonnement;
use App\Models\Abonnement;

class AbonnementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Abonnement::with("categorieAbonnement")->where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune abonnement trouvée'], 404);
        }

        return response()->json(['message' => 'Abonnements récupérés', 'data' => $data], 200);
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
            'avantage' => 'required|string|max:255',
            'categorie' => 'required|string|max:8',
            'description' => 'required|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $categorie = CategorieAbonnement::where('slug',$request->categorie)->where("is_deleted",false)->first();
        
        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        
        $data = Abonnement::create([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'avantage' => $request->input('avantage'),
            'categorie_abonnement_id' => $categorie->id,
            'description' => $request->input('description'),
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);

        if ($data) {
            return response()->json(['message' => 'Abonnement créé avec succès', 'data' => $data], 200);
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
        $data = Abonnement::with("categorieAbonnement")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Abonnement non trouvée'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Abonnement supprimée'], 404);
        }

        return response()->json(['message' => 'Abonnement trouvée', 'data' => $data], 200);
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
            'avantage' => 'required|string|max:255',
            'categorie' => 'required|string|max:8',
            'description' => 'required|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $categorie = CategorieAbonnement::where('slug',$request->categorie)->where("is_deleted",false)->first();
        
        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $data = Abonnement::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Abonnement non trouvée'], 404);
        }

        $data->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'avantage' => $request->input('avantage'),
            'categorie_abonnement_id' => $categorie->id,
            'description' => $request->input('description'),
        ]);

        return response()->json(['message' => 'Abonnement modifié avec succès', 'data' => $data], 200);

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
        $data = Abonnement::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Abonnement non trouvée'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Abonnement supprimée avec succès']);
    }
}