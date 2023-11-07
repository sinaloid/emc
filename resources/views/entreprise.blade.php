<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>


    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('Logo.png') }}" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('Logo.png') }}" />
    <link rel="stylesheet" href="{{asset("assets/css/index.css")}}">
    <title>EMC : Informations sur votre entreprise</title>
    <style>
        .bg-gray{
            background: #ddd;
        }
        .h-100{
            min-height: 100vh ;
        }
        .m-top{
            margin-top: 80px;
        }
    </style>
</head>

<body class="bg-gray">
    <div class="container h-100 m-top">
        <div class="row">
            <div class="col-md-5 mx-auto card p-3">
                <p class="text-center">
                    <img width="100px" src="{{asset('Logo.png')}}" />
                </p>
                <form action="{{route('entreprise')}}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Dénomination</label>
                        <input type="text" class="form-control" id="denomination"
                            placeholder="Dénomination" name="denomination">
                    </div>
                    <div class="mb-3">
                        <label for="forme_juridique" class="form-label">Forme juridique</label>
                        <input type="text" class="form-control" id="forme_juridique"
                            placeholder="Forme juridique" name="forme_juridique">
                    </div>
                    <div class="mb-3">
                        <label for="regime_imposition" class="form-label">Regime d'imposition</label>
                        <input type="text" class="form-control" id="regime_imposition"
                            placeholder="Regime d'imposition" name="regime_imposition">
                    </div>
                    <div class="mb-3">
                        <label for="ifu" class="form-label">IFU</label>
                        <input type="text" class="form-control" id="ifu"
                            placeholder="IFU" name="ifu">
                    </div>
                    <div class="mb-3">
                        <label for="rccm" class="form-label">RCCM</label>
                        <input type="text" class="form-control" id="rccm"
                            placeholder="RCCM" name="rccm">
                    </div>
                    <div class="mb-3">
                        <label for="boite_postale" class="form-label">Boite postale</label>
                        <input type="text" class="form-control" id="boite_postale"
                            placeholder="Boite postale" name="boite_postale">
                    </div>
                    <div class="mb-3">
                        <label for="telephone" class="form-label">téléphone</label>
                        <input type="text" class="form-control" id="telephone"
                            placeholder="telephone" name="telephone">
                    </div>
                    <div class="mb-3">
                        <label for="situation_geo" class="form-label">Situation géographique</label>
                        <input type="text" class="form-control" id="situation_geo"
                            placeholder="Situation géographique" name="situation_geo">
                    </div>
                    <input type="hidden" value="{{$paiement['email']}}" name="email" />
                    <input type="hidden" value="{{$paiement['slug']}}" name="devis" />
                    <div>
                        <a type="button" href="https://emc-burkina.com" class="btn btn-secondary d-inline-block pt-2">Annuler</a>
                        <button type="submit" class="btn btn-primary">Enregistre</button>
                    </div>
                </form>
                




            </div>
        </div>
    </div>
</body>

</html>
