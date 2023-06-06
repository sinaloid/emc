<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @php
        echo "<style>".file_get_contents('css/bootstrap.min.css')."</style>"
    @endphp
</head>

<body>

    <div class="container bg-black">
        <div class="d-flex">
            <div class="col-3">
                @php
                    $path = file_get_contents('images/logo.png');
                    $img = base64_encode($path);
                @endphp
                <img class="me-auto" src="{{ "data:image/jpeg;base64,' . $img . '" }}" alt="Logo de l'entreprise">
            </div>
            <div class="col-6">
                <h5>Informations du devis:</h5>
                <p>Devis n {{ $data->reference }}</p>
                <p>Date d'émission: {{ $data->startDate }}</p>
                <p>Date d'expiration: {{ $data->startDate }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">
                        <h4 class="mb-0">Devis</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h5>Informations du client:</h5>
                                <p>Nom prénom: {{ $user->lastname . ' ' . $user->firstname }}</p>
                                <p>Email: {{ $user->email }}</p>
                                <p>Téléphone: {{ $user->number }}</p>
                                <!-- Ajoutez d'autres informations du client ici -->
                            </div>
                            <div class="col-md-6">
                                <h5>Informations du devis:</h5>
                                <p>Référence: {{ $data->reference }}</p>
                                <p>Date: {{ $data->startDate }}</p>
                                <!-- Ajoutez d'autres informations du devis ici -->
                            </div>
                        </div>
                        <hr>
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Service publicitaire</th>
                                    <th>Catégorie</th>
                                    <th>Media</th>
                                    <th>Prix</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($details as $detail)
                                    <tr>
                                        <td>{{ $detail['name'] }}</td>
                                        <td>{{ $detail['categorie'] }}</td>
                                        <td>{{ $detail['media'] }}</td>
                                        <td>{{ $detail['price'] }}</td>
                                    </tr>
                                @endforeach
                                <!-- Ajoutez d'autres lignes de produits ou services ici -->
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="text-right">Total:</td>
                                    <td>{{ $data->price }}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="row">
                            <div class="col-md-6">
                                <h5>Conditions de paiement:</h5>
                                <p>{{ 'devis->conditions_paiement' }}</p>
                            </div>
                            <div class="col-md-6">
                                <h5>Remises:</h5>
                                <p>{{ 'devis->remises' }}</p>
                            </div>
                        </div>
                        <!-- Ajoutez d'autres informations du devis ici -->
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
