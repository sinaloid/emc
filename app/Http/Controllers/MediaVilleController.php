<?php

namespace App\Http\Controllers;

use App\Models\MediaVille;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Media;
use App\Models\Ville;
use Illuminate\Support\Str;

class MediaVilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MediaVille::where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune option trouvée'], 404);
        }

        return response()->json(['message' => 'MediaVille récupérées', 'data' => $data], 200);
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
            'media' => 'required|string|max:8',
            'ville' => 'required|string|max:8',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        
        $media = Media::where('slug',$request->media)->where("is_deleted",false)->first();
        
        if (!$media) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }

        $ville = Ville::where('slug',$request->ville)->where("is_deleted",false)->first();
        
        if (!$ville) {
            return response()->json(['message' => 'Ville non trouvé'], 404);
        }
        
        $data = MediaVille::create([
            'media_id' => $media->id,
            'ville_id' => $ville->id,
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);

        return response()->json(['message' => 'Option créée avec succès', 'data' => $data], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MediaVille  $mediaVille
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = MediaVille::where("slug",$slug)->first();

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
     * @param  \App\Models\MediaVille  $mediaVille
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        // Vérifier que les champs obligatoires sont remplis
        $validator = Validator::make($request->all(), [
            'media' => 'required|string|max:8',
            'ville' => 'required|string|max:8',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $media = Media::where('slug',$request->media)->where("is_deleted",false)->first();
        
        if (!$media) {
            return response()->json(['message' => 'Media non trouvé'], 404);
        }

        $ville = Ville::where('slug',$request->ville)->where("is_deleted",false)->first();
        
        if (!$ville) {
            return response()->json(['message' => 'Ville non trouvé'], 404);
        }

        $data = MediaVille::where('slug',$slug)->where("is_deleted",false)->first();
        
        if (!$data) {
            return response()->json(['message' => 'Option non trouvé'], 404);
        }
        
        $data->update([
            'media_id' => $media->id,
            'ville_id' => $ville->id, 
        ]);


        return response()->json(['message' => 'Option modifiée avec succès', 'data' => $data], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MediaVille  $mediaVille
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        // Trouver la catégorie de maison à supprimer
        $data = MediaVille::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Option non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Option supprimée avec succès']);
    }
}
