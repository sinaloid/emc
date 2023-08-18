<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EntrepriseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'denomination' => 'required|string|max:255',
            'forme_juridique' => 'required|string|max:255',
            'regime_imposition' => 'required|string|max:255',
            'ifu' => 'required|string|max:255',
            'rccm' => 'required|string|max:255',
            'boite_postale' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'situation_geo' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non connecter'], 404);
        }

        $data = Entreprise::create([
            'denomination' => $request->input('name'),
            'forme_juridique' => $request->input('name'),
            'regime_imposition' => $request->input('name'),
            'ifu' => $request->input('name'),
            'rccm' => $request->input('name'),
            'boite_postale' => $request->input('name'),
            'telephone' => $request->input('name'),
            'situation_geo' => $request->input('name'),
            'user_id' => $user->id,
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);
        
        return response()->json(['message' => 'Entreprise créé avec succès', 'data' => $data], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Entreprise  $entreprise
     * @return \Illuminate\Http\Response
     */
    public function show(Entreprise $entreprise)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Entreprise  $entreprise
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Entreprise $entreprise)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Entreprise  $entreprise
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entreprise $entreprise)
    {
        //
    }
}
