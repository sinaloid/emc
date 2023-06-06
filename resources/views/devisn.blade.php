<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Devis de Publicité</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }

      header {
        text-align: left;
        margin-bottom: 20px;
      }

      .company-info {
        margin-bottom: 20px;
      }

      .company-info img {
        max-width: 150px;
        margin-bottom: 10px;
      }

      .client-info {
        text-align: right;
        margin-bottom: 20px;
      }

      .devis-content {
        margin-bottom: 20px;
      }

      .devis-content h3 {
        margin-bottom: 10px;
      }

      .devis-content h4 {
        margin-bottom: 5px;
      }

      footer {
        border-top: 1px solid #ccc;
        padding-top: 20px;
      }

      .additional-info {
        margin-top: 10px;
      }
    </style>
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
  </head>
  <body>
    <header>
      <table>
        <tr>
          <td>
            @php $path = file_get_contents('images/logo.png'); $img =
            base64_encode($path); @endphp <img src="{{ "data:image/jpeg;base64,'
            . $img . '" }}" alt="Logo de l'entreprise">

          </td>
          <td>
            <h3>Contenu du devis</h3>
            <p>Date : {{ date('d/m/Y') }}</p>
            <p>Référence du devis : #12345</p>
          </td>
        </tr>
      </table>
      <div class="company-info">
        @php $path = file_get_contents('images/logo.png'); $img =
        base64_encode($path); @endphp <img src="{{ "data:image/jpeg;base64,' .
        $img . '" }}" alt="Logo de l'entreprise">
        <h2>Nom de l'entreprise</h2>
        <p>Adresse de l'entreprise</p>
        <p>Téléphone : 0123456789</p>
      </div>
    </header>

    <main>
      <div class="client-info">
        <h3>Informations du client</h3>
        <p>Nom du client : John Doe</p>
        <p>Email : john.doe@example.com</p>
        <p>Téléphone : 9876543210</p>
      </div>

      <div class="devis-content">
        <h3>Contenu du devis</h3>
        <p>Date : {{ date('d/m/Y') }}</p>
        <p>Référence du devis : #12345</p>

        <h4>Description des services publicitaires</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula
          pharetra turpis, nec efficitur elit pharetra et.
        </p>

        <h4>Tarifs</h4>
        <ul>
          <li>Service 1 : 100€</li>
          <li>Service 2 : 150€</li>
          <li>Service 3 : 200€</li>
        </ul>

        <p>Total : 450€</p>
      </div>
    </main>

    <footer>
      <div class="additional-info">
        <h4>Informations supplémentaires</h4>
        <p>Paiement à effectuer dans un délai de 30 jours.</p>
        <p>Conditions générales de vente : lorem ipsum dolor sit amet.</p>
      </div>
    </footer>
  </body>
</html>
