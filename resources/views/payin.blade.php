<?php

function Payin_with_redirection($transaction_id,$amount){

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://app.ligdicash.com/pay/v01/redirect/checkout-invoice/create",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS =>'
					  {
					  "commande": {
						"invoice": {
						  "items": [
							{
							  "name": "Nom de article ou service ou produits",
							  "description": "Description du service ou produits",
							  "quantity": 1,
							  "unit_price": "'.$amount.'",
							  "total_price": "'.$amount.'"
							}
						  ],
						  "total_amount": "'.$amount.'",
						  "devise": "XOF",
						  "description": "Descrion de la commande des produits ou services",
						  "customer": "",
						  "customer_firstname":"Prenom du client",
						  "customer_lastname":"Nom du client",
						  "customer_email":"tester@ligdicash.com"
						},
						"store": {
						  "name": "Rencontre B2B",
						  "website_url": "http://localhost/erencci"
						},
						"actions": {
						  "cancel_url": "http://127.0.0.1:8000/statut/public",
						  "return_url": "http://127.0.0.1:8000/statut/public",
						  "callback_url": "http://127.0.0.1:8000/statut/public"
						},
						"custom_data": {
						  "transaction_id": "'.$transaction_id.'"
						}
					  }
					}',
        CURLOPT_HTTPHEADER => array(
          "Apikey: 3VW1Z748L5275RIXN",
        "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9hcHAiOiIzMjY1IiwiaWRfYWJvbm5lIjoxMDcxNDgsImRhdGVjcmVhdGlvbl9hcHAiOiIyMDIyLTA0LTI2IDE0OjM4OjEyIn0.cXAC196_dJ5W-jTjp7pOPc6U2bZGqgnIwyj4EnpUXDk",
        "Accept: application/json",
        "Content-Type: application/json"
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
//XXXXXXXXXXXXXXXX-EXECUTION DES METHODES-XXXXXXXXXXXXXXXXXXXXXXX
$transaction_id='LGD'.date('Y').date('m').date('d').'.'.date('h').date('m').'.C'.rand(5,100000);
$amount=2000;
$amount = $price;
//$amount=$_GET['option']*1.035;

$redirectPayin =Payin_with_redirection($transaction_id,$amount);

//vous pouvez decommenter print_r($response) pour voir les resultats vour la documentationV1.2
//print_r($redirectPayin);exit;
//echo $redirectPayin->response_text;exit;
//echo $redirectPayin->token;exit;//Ce token doit etre enregistrer dans votre base de donne trasction client pour vos verrification de status apres paiement
$_SESSION['invoiceToken']=$redirectPayin->token;//Vous devez stoker ce TOKEN pour de verrification de status ulterieur
//$_SESSION['idParticipant']=$_GET['id'];//On recupere l'identifiant du participant
//$_SESSION['idForum']=$_GET['f'];//On recupere l'identifiant du forum
//$_SESSION['total']=$amount;//On recupere le total
//$_SESSION['montant']=$_GET['option'];//On recupere le montant
//$_SESSION['tid']=$transaction_id;//On recupere l'identifiant transaction

if(isset($redirectPayin->response_code) and $redirectPayin->response_code=="00") {
    //$redirectPayin->response_text contient l'url de redirection
    header('Location: '.$redirectPayin->response_text);
    print_r($redirectPayin->response_code);exit;
}
else{
    echo 'response_code='.$redirectPayin->response_code;
    echo '<br><br>';
    echo 'response_text='.$redirectPayin->response_text;
    echo '<br><br>';
    echo 'description='.$redirectPayin->description;
    echo '<br><br>';
    echo '<br><br>Veuillez lire la documentation et le WIKI subcodes[]';
    exit;
}

?>
