<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>


    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('Logo.png') }}" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('Logo.png') }}" />
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
                        <label for="exampleFormControlInput1" class="form-label">Denomination</label>
                        <input type="text" class="form-control" id="denomination"
                            placeholder="denomination" name="denomination">
                    </div>
                    <div class="mb-3">
                        <label for="forme_juridique" class="form-label">Forme juridique</label>
                        <input type="text" class="form-control" id="forme_juridique"
                            placeholder="forme_juridique" name="forme_juridique">
                    </div>
                    <div class="mb-3">
                        <label for="regime_imposition" class="form-label">Regime d'imposition</label>
                        <input type="text" class="form-control" id="regime_imposition"
                            placeholder="regime_imposition" name="regime_imposition">
                    </div>
                    <div class="mb-3">
                        <label for="ifu" class="form-label">Ifu</label>
                        <input type="text" class="form-control" id="ifu"
                            placeholder="ifu" name="ifu">
                    </div>
                    <div class="mb-3">
                        <label for="rccm" class="form-label">rccm</label>
                        <input type="text" class="form-control" id="rccm"
                            placeholder="rccm" name="rccm">
                    </div>
                    <div class="mb-3">
                        <label for="boite_postale" class="form-label">boite postale</label>
                        <input type="text" class="form-control" id="boite_postale"
                            placeholder="boite_postale" name="boite_postale">
                    </div>
                    <div class="mb-3">
                        <label for="telephone" class="form-label">telephone</label>
                        <input type="text" class="form-control" id="telephone"
                            placeholder="telephone" name="telephone">
                    </div>
                    <div class="mb-3">
                        <label for="situation_geo" class="form-label">situation_geo</label>
                        <input type="text" class="form-control" id="situation_geo"
                            placeholder="situation_geo" name="situation_geo">
                    </div>
                    <input type="hidden" value="{{$paiement['email']}}" name="email" />
                    <input type="hidden" value="{{$paiement['slug']}}" name="devis" />
                    <div>
                        <a href="https://emc-burkina.com" class="btn btn-warning">Annuler</a>
                        <button type="submit" class="btn btn-success">Enregistre</button>
                    </div>
                </form>
                




            </div>
        </div>
    </div>
</body>

</html>
