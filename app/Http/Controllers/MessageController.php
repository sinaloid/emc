<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use App\Models\User;


class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Message::with('receiver')->where("is_deleted", false)->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Aucun message trouvé'], 404);
        }

        return response()->json(['message' => 'Messages récupérés', 'data' => $data], 200);
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
            'subject' => 'required|string|max:255',
            'receiver' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
            //'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $receiver = User::where('email',$request->receiver)->first();
        
        if (!$receiver) {
            return response()->json(['message' => 'Destinateur non trouvé'], 404);
        }

        $data = Message::create([
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),
            'receiver_id' => $receiver->id,
            //'is_deleted' => false,
            'sender_id' => Auth::user()->id,
            'slug' => Str::random(8),
            //'image' => 'categories/' . $imageName,
        ]);

        $filePath = null;

        $this->sendEmail($receiver->email,$filePath,$data);
        
        return response()->json(['message' => 'Message envoyé avec succès', 'data' => $data], 200);

        
        if ($request->hasFile('image')) {
            // Générer un nom aléatoire pour l'image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();

            // Enregistrer l'image dans le dossier public/images
            $imagePath = $request->image->move(public_path('categories'), $imageName);

            if ($imagePath) {
                // Créer la nouvelle catégorie de média
                

                if ($data) {
                    return response()->json(['message' => 'Catégorie créée avec succès', 'data' => $data], 200);
                }
            }
        }

        return response()->json(['error' => 'Échec lors de la création'], 422);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Message::where("slug",$slug)->first();

        if (!$data) {
            return response()->json(['message' => 'Message non trouvé'], 404);
        }

        if ($data->is_deleted) {
            return response()->json(['message' => 'Message supprimé'], 404);
        }

        return response()->json(['message' => 'Message trouvé', 'data' => $data], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        // Trouver la catégorie de maison à supprimer
        $data = Message::where("slug",$slug)->where("is_deleted",false)->first();
        if (!$data) {
            return response()->json(['message' => 'Message non trouvé'], 404);
        }


        // Supprimer la catégorie de maison
        $data->update(["is_deleted" => true]);

        return response()->json(['message' => 'Message supprimé avec succès']);
    }

    public function sendEmail($email,$file,$data)
    {
      $data = [
        'subject' => $data->subject,
        'title' => $data->subject,
        'content' => $data->message
      ];

      Mail::to($email)->send(new SendMail($data,$file));

      return "E-mail envoyé avec succès.";
    }
}
