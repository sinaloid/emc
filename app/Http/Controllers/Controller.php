<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Http\Controllers\CampagneController;
use App\Http\Controllers\PubliciteController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\Auth\AuthController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Devis;
use App\Models\Entreprise;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function demandeDevis(Request $request)
    {
        //dd($request->all());

        $userData = $request->input("user");

        $user = User::where('email',$userData['email'])->first();
        if(!$user){
            $userData['password'] = Str::random(8);
            $authController = new AuthController();
            $user = $authController->registerNoVerification(new Request($userData));
            $user = $user->getData();
            $user = $user->user;
        }

        
        //dd($user->user->id);
        $user_id = $user->id;
        //dd($user_id);

        $campagneData = $request->input("campagne");
        $campagneController = new CampagneController();
        $campagneData['user_id'] = $user_id;
        //$response = $campagneController->store(new Request($campagneData));
        $headers = $request->headers->all();

    // Créer une nouvelle instance de Request avec les données de campagne et les en-têtes
        $newRequest = Request::create('/dummy-url', 'POST', $campagneData, [], [], $headers);
        $response = $campagneController->store($newRequest);
        $response = $response->getData();

        
        $list = $request->publicite;
        $publiciteController = app(PubliciteController::class);

        //dd($response->data->slug);
        $camp = $response->data->slug;
        $campDesc = $response->data->description;
        foreach($list as $lst){
           // dd($lst);
            $tab = [
                "campagne" => $camp,
                "mediaProduit" => $lst["slug"],
                "dates" => $lst["dates"],
                //"endDate" => $lst["time"],
            ];
            //$lst['campagne'] = $response->data->slug;
            //$lst['mediaProduit'] = $lst["slug"];
            $newRequest = Request::create('/dummy-url', 'POST', $tab, [], [], $headers);
            $response = $publiciteController->store($newRequest);
        }

        $devisController = app(DevisController::class);
        
        $devisData = [
            "campagne" =>  $camp,
            "description" => $campDesc,
            "startDate" =>  Carbon::now(),
            "endDate" =>  Carbon::now()->addDay(),
        ];
        $newRequest = Request::create('/dummy-url', 'POST', $devisData, [], [], $headers);
        $response = $devisController->store($newRequest);

        return $response;





        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucune campagne trouvé'], 404);
        }

        return response()->json(['message' => 'Campagnes récupérées', 'data' => $data], 200);
    }

    public function paiement($slug = ""){

        if($slug !== ""){

            $devis = Devis::where("slug",$slug)->first();
            $user = Devis::where("slug",$slug)->first()->campagne()->first()->user()->first();
            $entreprise = $user->entreprise()->first();
            //dd($entreprise);
            if(!$entreprise){
                $paiement = [
                    "email" => $user->email,
                    "slug" => $slug
                ];
                return view("entreprise", compact('paiement'));
            }
            if($devis){
                $devis->update([
                    "status" => 2
                ]);
                //session(['amount' => $devis->price]);
                $price = $devis->price + ($devis->price * 18/100);
                return view("payin", compact('price'));
            }
        }

    }

    public function entreprise (Request $request){

        //dd($request->all());

        $user = User::where("email",$request->email)->first();

        if(!$user){

            return back();
        }

        $data = Entreprise::create([
            "denomination" => $request->denomination,
            "forme_juridique" => $request->forme_juridique,
            "ifu" => $request->ifu,
            "rccm" => $request->rccm,
            "regime_imposition" => $request->regime_imposition,
            "boite_postale" => $request->boite_postale,
            "telephone" => $request->telephone,
            "situation_geo" => $request->situation_geo,
            "user_id" => $user->id,
            'is_deleted' => false,
            'slug' => Str::random(8),
        ]);

        return $this->paiement($request->devis);
    }

    public function statut(){

        return view("status_payin");

        if($slug !== ""){

            $devis = Devis::where("slug",$slug)->first();
            if($devis){
                //session(['amount' => $devis->price]);
                $price = "250000";//$devis->price;
                return view("status_payin", compact('price'));
            }
        }

    }
}