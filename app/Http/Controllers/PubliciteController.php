<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\MediaProduit;
use App\Models\Campagne;
use App\Models\Publicite;

class PubliciteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Publicite::with("campagne","mediaProduit","mediaProduit.media")->where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune publicité trouvée'], 404);
        }

        return response()->json(['message' => 'Publicités récupérées', 'data' => $data], 200);
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
            'mediaProduit' => 'required|string|max:8',
        ]);
        //dd($request->all());
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        
        $campagne = Campagne::where('slug',$request->campagne)->where("is_deleted",false)->first();
        
        if (!$campagne) {
            return response()->json(['message' => 'Campagne non trouvée'], 404);
        }

        $mediaProduit = MediaProduit::where('slug',$request->mediaProduit)->where("is_deleted",false)->first();
        
        if (!$mediaProduit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }
        
        $data = Publicite::create([
            'campagne_id' => $campagne->id,
            'media_produit_id' => $mediaProduit->id,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'status' => 0,
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);

        return response()->json(['message' => 'Publicité créée avec succès', 'data' => $data], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Publicite::with("campagne","mediaProduit","mediaProduit.media")->where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Publicité non trouvée'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Publicité supprimée'], 404);
        }

        return response()->json(['message' => 'Publicité trouvée', 'data' => $data], 200);
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
            //'campagne' => 'required|string|max:8',
            //'mediaProduit' => 'required|string|max:8',
            'status' => 'required|string|max:8',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        /*$campagne = Campagne::where('slug',$request->campagne)->where("is_deleted",false)->first();
        
        if (!$campagne) {
            return response()->json(['message' => 'Campagne non trouvée'], 404);
        }

        $mediaProduit = MediaProduit::where('slug',$request->mediaProduit)->where("is_deleted",false)->first();
        
        if (!$mediaProduit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }*/

        $data = Publicite::where('slug',$slug)->where("is_deleted",false)->first();
        
        if (!$data) {
            return response()->json(['message' => 'Publicité non trouvée'], 404);
        }
        
        $data->update([
            //'campagne_id' => $campagne->id,
            'status' => $request->status, 
        ]);


        return response()->json(['message' => 'Publicité modifiée avec succès', 'data' => $data], 200);

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
        $data = Publicite::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Publicité non trouvée'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Publicité supprimée avec succès']);
    }
}