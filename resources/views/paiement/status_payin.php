<?php

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function StorePaiement($from_data, $user,$devis){
    App\Models\Paiement::create($from_data);
    $listPub = App\Models\Devis::where("id", $devis->id)->first()->campagne()->first()->publicites()->get();
    $details = [];
    $price = 0;
    //dd($listPub);
    foreach($listPub as $item){
        //dd($item["slug"]);
        $element = App\Models\MediaProduit::where("id",$item->media_produit_id)->first();// $mediaProduit->mediaProduit()->first();
        $quantite = $item->pubPeriodes()->get();
        $quantite = count($quantite);
        if($element){
            array_push($details,[
                "name" =>$element->name,
                "price" =>$element->price,
                "total" =>$quantite * $element->price,
                "quantite" => $quantite,
                "media" =>$element->media()->first()->name,
                "categorie" =>$element->media()->first()->categorieMedia()->first()->name,
            ]);
            $price = $quantite * $element->price + $price;
        }
    }

    //dd($details);
    $entreprise = App\Models\User::where('id',$user->id)->first()->entreprises()->first();
    //dd($entreprise);
    $data = $devis;
    $pdf = Barryvdh\DomPDF\Facade\Pdf::loadView('facture', compact('user','data','details','entreprise'));
    //return $pdf->download();
    
    // Générez un nom de fichier unique pour le PDF
    $pdfPath = 'pdf/facture/facture-pdf-' . time() . '.pdf';

    // Enregistrez le fichier PDF sur le disque
    $output = $pdf->output();
    file_put_contents($pdfPath, $output);

    $data = [
        'subject' => "Votre paiement de facture sur EMC",
        'title' => "Nous vous remercions d’avoir choisi EMC pour l’achat de vos espaces publicitaires.",
        'name' => $user->lastname."".$user->firstname,
        'slug' => "slug",
        
      ];    
      
      Illuminate\Support\Facades\Mail::to($user->email)->send(new App\Mail\SendFacture($data,$pdfPath));

    \Session::flash('success','Paiement effectué avec succès !!!');
}

function StatusPayin($invoiceToken){

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://app.ligdicash.com/pay/v01/redirect/checkout-invoice/confirm/?invoiceToken=".$invoiceToken,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Apikey: BLTSNBDDJ185Y4A68",
            "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9hcHAiOiIxMjIxNiIsImlkX2Fib25uZSI6MzQ1NzAyLCJkYXRlY3JlYXRpb25fYXBwIjoiMjAyMy0xMC0yNyAxMDoyOTo1NiJ9.TOLJ6-jLgCu70jbDG06XvPuUqZ8lIxihHeTVlRQ9G1Q",
        ),
    ));
    $response = json_decode(curl_exec($curl));
    curl_close($curl);

    return $response;
}


//XXXXXXXXXXXXXXXX-EXECUTION DES METHODES-XXXXXXXXXXXXXXXXXXXXXXX

/*
 En cas de reclamation ou de besoin de correction ou verrification d'une transaction,
 vous pouvez rappeler la transaction en recuperant le token par session ou depuis votre DB ou par variable $_GET['token']
 Raison pour laquel vous devez stocker le 'invoiceToken=' de votre transaction client dans votre base de données historique transaction ou en variable SESSION
 On suppose que le 'invoiceToken=' est recuperé par exemple
*/
//echo $_GET['token'];
//$invoiceToken=$_GET['token'];

session_start();
$invoiceToken=$_SESSION['invoiceToken'];
//$idcompte=$_SESSION['idForum'];
$idparticipant=$_SESSION['idParticipant'];
$montant=$_SESSION['montant'];
$total=$_SESSION['total'];
$tid=$_SESSION['tid'];

$user=$_SESSION['user'];
$devis=$_SESSION['devis'];
$price=$_SESSION['montant'];

//$participant = \App\Participants::participant($idparticipant);
$participant = $_SESSION['user'];

$Payin = StatusPayin($invoiceToken);
$from_data = array(
    //'id_compte'   =>  $idcompte,
    //'user_id'   =>  $user->id,
    'transaction_id'   =>  $tid,
    'date'   =>  date('d/m/Y'),
    'montant'   =>  $montant,
    //'total'   =>  $total,
    //'frais'   =>  ($total - $montant),
    'numero_paiement'   =>  "74859612",
    'email'   =>  $user->email,
    'nom'   =>  $user->lastname,
    'prenom'   =>  $user->firstname,
    'devis_id'   =>  $devis->id,
    //'nom_recep'   =>  "",
    //'prenom_recep'   =>  "",
    'etat'   =>  "status",
    'operator_id'   =>  "orange_id",
    'operator_name'   =>  "orange",
    'token_d'   =>  $invoiceToken,
    'token_r'   =>  $invoiceToken,
    'slug' => Illuminate\Support\Str::random(8)
);
if(isset($Payin)) {
    if(trim($Payin->status)=="completed") {
        echo "Le client(Payer) a validé le paiement vous devez executé vos traitements apres paiement valide<br><br>";
        //print_r($Payin);
        $from_data = array(
            //'id_compte'   =>  $idcompte,
            //'user_id'   =>  $user->id,
            'transaction_id'   =>  $tid,
            'date'   =>  date('d/m/Y'),
            'montant'   =>  $montant,
            //'total'   =>  $total,
            //'frais'   =>  ($total - $montant),
            'numero_paiement'   =>  $Payin->customer,
            'email'   =>  $user->email,
            'nom'   =>  $user->lastname,
            'prenom'   =>  $user->firstname,
            'devis_id'   =>  $devis->id,
            //'nom_recep'   =>  "",
            //'prenom_recep'   =>  "",
            'etat'   =>  $Payin->status,
            'operator_id'   =>  $Payin->operator_id,
            'operator_name'   =>  $Payin->operator_name,
            'token_d'   =>  $invoiceToken,
            'token_r'   =>  $invoiceToken,
            'slug' => Illuminate\Support\Str::random(8)
        );
       
        StorePaiement($from_data, $user, $devis);
        //return view('participant.index');
        include("success.blade.php");
        //echo 'status='.$Payin->status;;
        //echo '<br><br>';
        //echo 'response_text='.$Payin->response_text;
    }
    elseif(trim($Payin->status)=="nocompleted") {
        //StorePaiement($from_data, $user, $devis);

        include("pending.blade.php");
        /*echo "Le client(Payer) a annulé le paiement donc vous devez executer vos traitements correspondant<br><br>";
        //print_r($Payin);
        echo 'status='.$Payin->status;;
        echo '<br><br>';
        echo 'response_text='.$Payin->response_text;*/
    }
    elseif(trim($Payin->status)=="pending") {
        //StorePaiement($from_data, $user, $devis);

        include("pending.blade.php");
        //echo '<script>window.location ="/paiement/public/'.$devis->slug.'";</script>';
        /*echo "Le client(Payer) n'a pas encore validé le paiement mobile money,donc vous devez executer vos traitements correspondant<br><br>";
        //print_r($Payin);
        echo 'status='.$Payin->status;;
        echo '<br><br>';
        echo 'response_text='.$Payin->response_text;*/
    }
    else {
        echo '<br><br>Veuillez lire la documentation et le WIKI subcodes[]<br>';
        print_r($Payin);
    }
}else{
    return false;
}

?>
