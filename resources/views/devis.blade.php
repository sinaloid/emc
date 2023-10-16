<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pdf</title>
    <style>
        :root {
            --primary-color: #1f2e54;
            --secondary-color: #e5282a;
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
            font-size: 1rem;
            font-family: "Bariol", "Rubik", "Sofia Sans Condensed", Nunito,
                Montserrat, "HK Grotesk", -apple-system, BlinkMacSystemFont,
                "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
            line-height: 160%;
            color: #1f2e54;
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
            background-color: #1f2e54;
        }

        .text-secondary {
            color: #e5282a;
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
            border: 1px solid #1f2e54;
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
            border-right: 1px solid #1f2e54 !important;
        }

        .text-white {
            color: white;
        }

        .text-underline {
            text-decoration: underline;
        }

        .m-100{
            margin-top: 100px;
        }

        .border-top{
            border-top: 1px solid #1f2e54
        }
        .position-relative{
            position: relative;
        }
        .position-absolute{
            position: absolute;
            bottom: 50%;
            right: 0;
            opacity: 0.08;
        }
    </style>
</head>

<body>
    <div class="container p-2">
        <div class="header fw-bold">
            
            <!--div class="ps-3">
                @php $path = file_get_contents('images/emc_logo_color.png');
                $img = base64_encode($path); @endphp <img width="230px" class="me-auto" src="{{ "data:image/jpeg;base64,' . $img . '" }}"
                    alt="Logo de l'entreprise">
            </div-->
            <div class="table-container py-21">
                <div class="column">
                    @php $path = file_get_contents('images/emc_logo_color.png');
                    $img = base64_encode($path); @endphp <img width="230px" class="me-auto"
                        src="{{ "data:image/jpeg;base64,' . $img . '" }}"
                        alt="Logo de l'entreprise">
                </div>
                <div class="column">
                    <p class="text-right1">
                        <span class="fw-bold text-24">Devis</span><br />
                        <span class="">
                            N° du devis : {{ $data->reference }} </span><br />
                        <span class="">
                            Date d’émission : {{ date('d/m/Y', strtotime($data->startDate))}} </span><br /><br />
                        <span>À</span><br /><br />
                        <span class="">{{ $user->lastname . ' ' . $user->firstname }}</span><br />
                        <span class="">Tél.: {{ $user->number }}</span><br />
                        <span class="text-uppercase1">E-mail: {{ $user->email }}</span><br />
                    </p>
                </div>
            </div>
        </div>
        <div class="content m-100 position-relative">
            @php $path = file_get_contents('images/start.png');
                    $img = base64_encode($path); @endphp <img width="400px" class="position-absolute"
                        src="{{ "data:image/jpeg;base64,' . $img . '" }}"
                        alt="Logo de l'entreprise">
            <div class="table-container">
                <div class="column">
                    <!--p>Nom prénom : Traore Moussa</p>
                        <p>Téléphone : 75 xx xx xx</p>
                        <p>Email : moussa@gmail.com</p-->
                </div>
                <div class="column">
                    <!--p class="text-right">
                            Réference du devis : {{ $data->reference }}
                        </p>
                        <p class="text-right">
                            Date de la demande : {{ $data->startDate }}
                        </p-->
                </div>
            </div>
            <p class="fw-bold my-3 text-24 text-underline">
                Objet : Demande de devis
            </p>
            <div class="table">
                <div class="table-container border fw-bold">
                    <div class="column">
                        <p>Espaces publicitaires</p>
                    </div>
                    <div class="column">
                        <p class="">Catégories</p>
                    </div>
                    <div class="column">
                        <p class="">Média/Régie</p>
                    </div>
                    <div class="column">
                        <p class="">Quantité</p>
                    </div>
                    <div class="column">
                        <p class="">Prix unitaires HT</p>
                    </div>
                    <div class="column">
                        <p class="">Total HT</p>
                    </div>
                </div>
                @foreach ($details as $detail)
                    <div class="table-container border">
                        <div class="column">
                            <p>{{ $detail['name'] }}</p>
                        </div>
                        <div class="column">
                            <p class="">{{ $detail['categorie'] }}</p>
                        </div>
                        <div class="column">
                            <p class="">{{ $detail['media'] }}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['quantite']}}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['price']." FCFA"}}</p>
                        </div>
                        <div class="column">
                            <p class="text-right">{{ $detail['total']." FCFA"}}</p>
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
                    <div class="column no-border">
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
                        <p class="fw-bold">Total (HT)</p>
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
                        <p class="fw-bold">TVA (18%)</p>
                    </div>
                    <div class="column">
                        <p class="text-right">
                            {{ ($data->price * 18) / 100 }} FCFA
                        </p>
                    </div>
                </div>
                <div class="table-container border">
                    <div class="column no-border">
                        <p></p>
                    </div>
                    <div class="column no-border border-right">
                        <p class="text-right"></p>
                    </div>
                    <div class="column bg-primary text-white">
                        <p class="fw-bold">Total (TTC)</p>
                    </div>
                    <div class="column bg-primary text-white">
                        <p class="text-right fw-bold">
                            {{ ($data->price * 18) / 100 + $data->price }}
                            FCFA
                        </p>
                    </div>
                </div>
            </div>
            <div class="table-container">
                <div class="column"></div>
                <div class="column bg-primary1 text-right1">
                    <p class="text-right1">
                        Si vous souhaiter régler ce devis,
                        <a class="text-secondary"
                            href="https://emc-burkina.com/paiement/public/{{ $data->slug }}">cliquez ici !</a>
                    </p>
                    <p class="text-right1">
                        <span>Vous souhaitez notre assistance ?</span><br />
                        <span>Contacter notre service client aux numéros :</span><br />
                        <span>(+226) 50 00 00 00 / 25 00 00 00</span><br />
                    </p>
                </div>
            </div>
        </div>
        
        <div class="footer text-14 m-100 border-top">
            <p class="text-center text-14 mt-5">
                <span class="fw-bold">Elie Régie</span> - Société à
                Responsabilité Limitée (SARL) au capital de 1.000.000 de
                Francs CFA | <span class="fw-bold">Siège social</span>:
                Secteur 49, Section 815 Lot 26 Parcelle 20 |
                <span class="fw-bold">Adresse postale</span>: 01 BP 6943
                Ouagadougou - Burkina Faso |
                <span class="fw-bold">RCCM</span>: BFOUA2019B9982 |
                <span class="fw-bold">IFU</span>: 00129466Z |
                <span class="fw-bold">CNSS</span>: 1329764P |
                <span class="fw-bold">Compte BOA</span> N° 008812220023 |
                <span class="fw-bold">Régime d’imposition</span>: RSI |
                <span class="fw-bold">CME Service des impôts de rattachement</span>
                : division fiscale du Centre Ouaga 1 |
                <span class="fw-bold">Tél</span>: (+226) 53579595 |
                <span class="fw-bold">Email</span> : ergie@elite.com
            </p>
        </div>
    </div>
</body>

</html>
