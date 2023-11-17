<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>


    <link rel="apple-touch-icon" sizes="180x180" href="https://emc-burkina.com/Logo.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://emc-burkina.com/Logo.png" />
    <link rel="stylesheet" href="https://emc-burkina.com/assets/css/index.css">
    <title>EMC : Informations sur votre entreprise</title>
    <style>
        .bg-gray {
            background: #ddd;
        }

        .h-100 {
            min-height: 100vh;
        }

        .m-top {
            margin-top: 40vh;
        }
    </style>
</head>

<body class="bg-gray">
    <div class="container h-100 m-top">
        <div class="row">
            <div class="col-md-6 mx-auto card p-3">
                <p class="text-center">
                    <img width="100px" src="https://emc-burkina.com/Logo.png" />
                </p>
                <div class="text-center1">
                    <p>
                        Sur EMC nous disposons de deux méthode pour régler votre facture en toute simplicité. Choisissez
                        parmi nos options traditionnelles telles que le virement bancaire, le bon de commande, ou le
                        paiement en espèces, ou optez pour des solutions électroniques et mobiles modernes, notamment
                        Orange
                        Money, Moov Money, et la carte Visa.


                    </p>

                    <span>Catégories de Paiement :</span>
                    <ul class="d-block pt-3">
                        <li>
                            <span class="fw-bold">Paiements Traditionnels :</span>
                            <ul>
                                <li>
                                    Virement bancaire
                                </li>
                                <li>Bon de commande</li>
                                <li>Paiement en espèces</li>
                            </ul>
                        </li>
                        <li>
                            <span class="fw-bold">Paiements Électroniques et Mobiles :</span>
                            <ul>
                                <li>Orange Money</li>
                                <li>Moov Money</li>
                                <li>Carte Visa</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="mt-5 d-flex flex-wrap justify-content-center">
                    <button type="button" class="btn btn-secondary d-inline-block pt-2 mx-2 mb-3"
                        data-bs-toggle="modal" data-bs-target="#traditionnel">Paiements Traditionnels</button>
                    <a type="button" href="https://emc-burkina.com/paiement-electronique/public/<?php echo $slug; ?>"
                        class="btn btn-primary d-inline-block pt-2 mx-2 mb-3">Paiements Électroniques et Mobiles</a>
                </div>
            </div>
        </div>


        <div class="modal fade" id="traditionnel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Paiement traditionnel</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Pour faire un paiement à travers la méthode traditionnel,<br /> Veuillez contactez ce numero
                        <span class="fw-bold">226 xx xx xx xx</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
