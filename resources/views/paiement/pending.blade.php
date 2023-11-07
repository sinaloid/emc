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
        .bg-gray{
            background: #ddd;
        }
        .h-100{
            min-height: 100vh ;
        }
        .m-top{
            margin-top: 40vh;
        }
    </style>
</head>

<body class="bg-gray">
    <div class="container h-100 m-top">
        <div class="row">
            <div class="col-md-5 mx-auto card p-3">
                <p class="text-center">
                    <img width="100px" src="https://emc-burkina.com/Logo.png" />
                </p>
                <div class="text-center">
                    Votre paiement n'a pas abouti, voulez-vous reesayer ?
                </div>
                <div class="mt-5 d-flex justify-content-center">
                    <a type="button" href="https://emc-burkina.com" class="btn btn-secondary d-inline-block pt-2 mx-2">Non</a>
                    <a type="button" href="https://emc-burkina.com/paiement/public/<?php echo $devis->slug ?>" class="btn btn-primary d-inline-block pt-2 mx-2">Oui</a>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
