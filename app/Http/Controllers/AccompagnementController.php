<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Accompagnement;

class AccompagnementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Accompagnement::where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun accompagnement trouvé'], 404);
        }

        return response()->json(['message' => 'Accompagnements récupérés', 'data' => $data], 200);
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
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'phone' => 'required|integer|digits:8|starts_with:5,6,7,01,02,03,05,06,07',
            //'budget' => 'required|string|max:255',
            'date' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        
        $data = Accompagnement::create([
            'lastname' => $request->input('lastname'),
            'firstname' => $request->input('firstname'),
            'phone' => $request->input('phone'),
            //'budget' => $request->input('budget'),
            'startDate' => $request->input('date'),
            'description' => $request->input('description'),
            'status' => false,
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);

        if ($data) {
            return response()->json(['message' => 'Accompagnement créé avec succès', 'data' => $data], 200);
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
        $data = Accompagnement::where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Accompagnement non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Accompagnement supprimé'], 404);
        }

        return response()->json(['message' => 'Accompagnement trouvé', 'data' => $data], 200);
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
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'phone' => 'required|integer|digits:8|starts_with:5,6,7,01,02,03,05,06,07',
            //'budget' => 'required|string|max:255',
            'date' => 'required|string|max:255',
            'status' => 'required|boolean',
            'description' => 'required|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $data = Accompagnement::where("slug", $slug)->where("is_deleted",false)->first();

        if (!$data) {
            return response()->json(['message' => 'Accompagnement non trouvé'], 404);
        }

        $data->update([
            'lastname' => $request->input('lastname'),
            'firstname' => $request->input('firstname'),
            'phone' => $request->input('phone'),
            //'budget' => $request->input('budget'),
            'startDate' => $request->input('date'),
            'status' => (int)$request->input('status'),
            'description' => $request->input('description'),
        ]);

        return response()->json(['message' => 'Accompagnement modifié avec succès', 'data' => $data], 200);

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
        $data = Accompagnement::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Accompagnement non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Accompagnement supprimé avec succès']);
    }
}