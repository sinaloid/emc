<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ 'Verification de mail' }}</title>
    <style>
        /* Ajoutez ici votre style personnalisé */
        body {
            font-family: Arial, sans-serif;
            color: #333333;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo {
            max-width: 150px;
            height: auto;
        }

        .content {
            margin-bottom: 20px;
        }

        .footer {
            text-align: center;
            color: #888888;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img class="logo" src="{{ asset('images/lg.png') }}" alt="Logo">
        </div>
        <div class="content">
            <p>Bonjour {!! $data['name'] !!},</p>
            <p>{{ $data['title'] }}</p>
            <p>Veuillez trouver en pièce jointe, votre facture !</p>
            
            <p>A très bientôt sur EMC !</p>

            <p>Cordialement,<br>{{ "L'Équipe EMC !" }}</p>
        </div>
        <div class="footer">
            © {{ date('Y') }} EMC. Tous droits réservés.
        </div>
    </div>
</body>

</html>
