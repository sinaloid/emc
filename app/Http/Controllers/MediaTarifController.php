<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\CategorieMedia;
use App\Models\Media;
use App\Models\MediaTarif;

class MediaTarifController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MediaTarif::where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune tarif trouvé'], 404);
        }

        return response()->json(['message' => 'Tarifs récupérés', 'data' => $data], 200);
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
            'price' => 'required|string|max:255',
            'media' => 'required|string|max:8',
            'period' => 'required|string|max:8',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $media = Media::where("slug", $request->media)->first();

        if (!$media) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }
        
        $data = MediaTarif::create([
            'price' => $request->input('price'),
            'period' => $request->input('period'),
            'is_deleted' => false,
            'slug' => Str::random(8),
            'media_id' => $media->id,
        ]);

        if ($data) {
            return response()->json(['message' => 'Tarif créé avec succès', 'data' => $data], 200);
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
        $data = MediaTarif::where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Tarif non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Tarif supprimé'], 404);
        }

        return response()->json(['message' => 'Tarif trouvé', 'data' => $data], 200);
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
            'price' => 'required|string|max:255',
            'period' => 'required|string|max:8',
            'media' => 'required|string|max:8',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $media = Media::where("slug", $request->media)->first();

        if (!$media) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }

        $data = MediaTarif::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Tarif non trouvé'], 404);
        }

        $data->update([
            'price' => $request->input('price'),
            'period' => $request->input('period'),
            'media_id' => $media->id,
        ]);

        return response()->json(['message' => 'Tarif modifié avec succès', 'data' => $data], 200);

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
        $data = MediaTarif::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Tarif non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Tarif supprimé avec succès']);
    }
}