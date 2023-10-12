<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pdf</title>
    <style>
        :root {
            --primary-color: #07298f;
            --secondary-color: #2465dd;
        }

        *,
        *::before,
        *::after {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        body {
            width: 100%;
            font-size: 16px;
            line-height: 170%;
            font-family: Poppins, Arial, Helvetica, sans-serif;
        }

        .container {
            width: 90%;
            min-width: 500px;
            margin: 32px auto;
            margin-bottom: 0;
            background-color: #fff;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .text-14 {
            font-size: 14px;
        }

        .text-24 {
            font-size: 24px;
        }

        .text-uppercase {
            text-transform: uppercase;
        }

        .fw-bold {
            font-weight: bold;
        }

        .table {
            width: 100%;
            min-width: 400px;
            margin: 0 auto;
            margin-top: 40px;
        }

        .py-2 {
            padding: 16px 0;
        }

        .ps-5 {
            padding-left: 80px;
        }

        .bg-primary {
            background-color: blue;
        }

        .table-container {
            width: 100%;
            max-width: 100%;
            display: table;
            table-layout: fixed;
        }

        .column {
            display: table-cell;
        }

        .border>.column {
            border: 1px solid black;
            padding: 0 8px;
        }

        .mt-5 {
            margin-top: 40px;
        }

        .my-3 {
            margin: 24px 0;
        }

        .no-border {
            border: none !important;
        }

        .border-right {
            border-right: 1px solid black !important;
        }
    </style>
</head>

<body>
    <div class="container p-2">
        <div class="header fw-bold">
            <div class="ps-3">
                @php
                    $path = file_get_contents('images/logo.png');
                    $img = base64_encode($path);
                @endphp
                <img class="me-auto" src="{{ "data:image/jpeg;base64,' . $img . '" }}" alt="Logo de l'entreprise">
            </div>
            <div class="table-container py-21">
                <div class="column">
                    <span class="text-uppercase">élite média connect </span><br />
                    <span class="text-uppercase">+226 xx xx xx xx </span><br />
                    <span class="text-uppercase">info@emc-burkina.com </span><br />
                    <span class="text-uppercase">Ouagadougou, Burkina Faso </span><br />
                </div>
                <div class="column">
                    <p class="text-right text-uppercase">
                        <span class="text-uppercase">annonceur</span><br />
                        <span class="text-uppercase">{{ $user->lastname . ' ' . $user->firstname }}</span><br />
                        <span class="text-uppercase">{{ $user->number }}</span><br />
                        <span class="text-uppercase">{{ $user->email }}</span><br />
                    </p>
                </div>
            </div>
        </div>
        <div class="content">
            <p class="text-center text-uppercase fw-bold my-3 text-24">
                Devis
            </p>
            <div class="table-container">
                <div class="column">
                    <!--p>Nom prénom : Traore Moussa</p>
                        <p>Téléphone : 75 xx xx xx</p>
                        <p>Email : moussa@gmail.com</p-->
                </div>
                <div class="column">
                    <p class="text-right">
                        Réference du devis : {{ $data->reference }}
                    </p>
                    <p class="text-right">
                        Date de la demande : {{ $data->startDate }}
                    </p>
                </div>
            </div>

            <div class="table">
                <div class="table-container border fw-bold">
                    <div class="column">
                        <p>Service publicitaire</p>
                    </div>
                    <div class="column">
                        <p class="text-right">Catégorie</p>
                    </div>
                    <div class="column">
                        <p class="text-right">Média</p>
                    </div>
                    <div class="column">
                        <p class="text-right">Quantité</p>
                    </div>
                    <div class="column">
                        <p class="text-right">Prix unitaire HT</p>
                    </div>
                    <div class="column">
                        <p class="text-right">Total HT</p>
                    </div>
                </div>
                @foreach ($details as $detail)
                    <div class="table-container border">
                        <div class="column">
                            <p>{{ $detail['name'] }}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['categorie'] }}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['media'] }}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['quantite'] }}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['price'] }}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['total'] }}</p>
                        </div>
                    </div>
                @endforeach
                <div class="table-container border">
                    <div class="column no-border">
                        <p></p>
                    </div>
                    <div class="column no-border">
                        <p class="text-right"></p>
                    </div>
                    <div class="column no-border">
                        <p class="text-right fw-bold"></p>
                    </div>
                    <div class="column no-border border-right">
                        <p class="text-right"><br /></p>
                    </div>
                </div>
                <div class="table-container border">
                    <div class="column no-border">
                        <p></p>
                    </div>
                    <div class="column no-border border-right">
                        <p class="text-right"></p>
                    </div>
                    <div class="column">
                        <p class="text-right fw-bold">Total HT</p>
                    </div>
                    <div class="column">
                        <p class="text-right">{{ $data->price }} FCFA</p>
                    </div>
                </div>
                <div class="table-container border">
                    <div class="column no-border">
                        <p></p>
                    </div>
                    <div class="column no-border border-right">
                        <p class="text-right"></p>
                    </div>
                    <div class="column">
                        <p class="text-right fw-bold">TVA 18%</p>
                    </div>
                    <div class="column">
                        <p class="text-right">{{($data->price * 18)/100}} FCFA</p>
                    </div>
                </div>
                <div class="table-container border">
                    <div class="column no-border">
                        <p></p>
                    </div>
                    <div class="column no-border border-right">
                        <p class="text-right"></p>
                    </div>
                    <div class="column">
                        <p class="text-right fw-bold">Total TTC</p>
                    </div>
                    <div class="column">
                        <p class="text-right">{{(($data->price * 18)/100) + $data->price }} FCFA</p>
                    </div>
                </div>

            </div>
        </div>
        <div class="table-container">
            <div class="column">
                
            </div>
            <div class="column">
                <p class="text-right">
                    <a href="https://emc-burkina.com/paiement/public/{{$data->slug}}">Cliquez pour accepter le devis et payer</a>
                </p>
            </div>
        </div>
        <div class="footer text-14">
            <p class="text-center mt-5">
                <span>Email : info@emc-burkina.com</span>
                <span>Téléphone: +226 xx xx xx xx / +226 xx xx xx xx</span>
            </p>
            <p class="text-center text-14">
                &copy; 2023 EMC. Tous droits
                réservés.
            </p>
        </div>
    </div>
</body>

</html>
