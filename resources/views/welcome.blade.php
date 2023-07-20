<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>EMC</title>
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('Logo.png') }}" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('Logo.png') }}" />
    <!-- Fonts -->
    <!--link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Styles -->

    @viteReactRefresh
    @vite('resources/js/app.js')
</head>

<body>
    <!-- React root DOM -->
    <div id="app" class="container-fluid">
    </div>
    <!-- React JS -->
</body>

</html>
