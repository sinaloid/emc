<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\OTPController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\OTP;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
       
        //$otpController = app(OTPController::class);
        //$msg = $otpController->generateOTP($request);
        //$msg = $otpController->verifyOTP($request);
        
        $validator = Validator::make($request->all(), [
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'number' => 'nullable|integer|digits:8|starts_with:5,6,7,01,02,03,05,06,07|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $otpEmail = OTP::where('email', $request->email)
            ->where('is_verified', true)
            ->first();

        $otpNumber = OTP::where('number', $request->number)
            ->where('is_verified', true)
            ->first();
            

        if ($otpEmail || $otpNumber) {
            $user = User::create([
                'lastname' => $request->lastname,
                'firstname' => $request->firstname,
                'status' => $request->status,
                'number' => $request->number,
                'email' => $request->email,
                'email_verified' => isset($otpEmail) ? true : false,
                'number_verified' => isset($otpNumber) ? true : false,
                'password' => bcrypt($request->password),
            ]);

            if ($request->hasFile('image')) {
                // Générer un nom aléatoire pour l'image
                $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();
    
                // Enregistrer l'image dans le dossier public/images
                $imagePath = $request->image->move(public_path('users'), $imageName);
    
                if ($imagePath) {
                    $user->update([
                        'image' => 'users/' . $imageName,
                    ]);
                }
            }
    
            $token = $user->createToken('my-app-token')->accessToken;
    
            return response(['user' => $user, 'access_token' => $token]);
        } else {
            // Réponse d'erreur
            return response()->json(['error' => "Votre adresse e-mail ou votre numéro de téléphone n'a pas été vérifié"], 422);
        }
        
    }

    public function login(Request $request)
    {
        $credentialsEmail = $request->only('email', 'password');
        $credentialsNumero = $request->only('number', 'password');

        if (Auth::attempt($credentialsEmail) || Auth::attempt($credentialsNumero)) {
            $user = Auth::user();
            $token = $user->createToken('my-app-token')->accessToken;
            return response(['user' => $user, 'access_token' => $token]);
        }

        return response(['errors' => 'Invalid login credentials'], 401);
    }

    public function index()
    {
        $users = User::all();
        return response()->json(['users' => $users], 200);
    }


    public function sendEmail()
    {
      $data = [
          'title' => 'Titre de l\'e-mail',
          'content' => 'Contenu de l\'e-mail.'
      ];

      Mail::to('sinaloid@gmail.com')->send(new SendMail($data));

      return "E-mail envoyé avec succès.";
    }


}
