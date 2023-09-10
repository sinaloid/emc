<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\OTPController;
use App\Http\Controllers\CategorieMediaController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\MediaTarifController;
use App\Http\Controllers\MediaProduitController;
use App\Http\Controllers\MediaProduitOptionController;
use App\Http\Controllers\CampagneController;
use App\Http\Controllers\PubliciteController;
use App\Http\Controllers\CampagneOptionController;
use App\Http\Controllers\CategorieFiltreController;
use App\Http\Controllers\FiltreController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\AbonnementController;
use App\Http\Controllers\CategorieAbonnementController;
use App\Http\Controllers\AccompagnementController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/register', [AuthController::class,'register']);
    Route::post('/login', [AuthController::class,'login']);
    Route::post('/generateOTP', [OTPController::class,'generateOTP']);
    Route::post('/verifyOTP', [OTPController::class,'verifyOTP']);

    Route::get('categorieMedias/public', [CategorieMediaController::class,'index']);
    Route::get('categorieMedias/public/{slug}', [CategorieMediaController::class,'show']);

    Route::get('medias/public', [MediaController::class,'index']);
    Route::get('public/medias/categorie/{slug?}', [MediaController::class,'mediasByCategorie']);
    Route::get('medias/public/{slug}', [MediaController::class,'show']);

    Route::get('mediaTarifs/public', [MediaTarifController::class,'index']);
    Route::get('mediaTarifs/public/{slug}', [MediaTarifController::class,'show']);
    
    Route::get('public/mediaProduits/categorie/{slug?}', [MediaProduitController::class,'index']);
    Route::get('public/mediaProduits/media/{slug?}', [MediaProduitController::class,'produitByMedia']);
    Route::get('mediaProduits/public/{slug}', [MediaProduitController::class,'show']);
    
    Route::get('categorieFiltres/public', [CategorieFiltreController::class,'index']);
    Route::get('categorieFiltres/public/{slug}', [CategorieFiltreController::class,'show']);

    Route::get('filtres/public', [FiltreController::class,'index']);
    Route::get('filtres/public/{slug}', [FiltreController::class,'show']);

    Route::get('categorieAbonnements/public', [CategorieAbonnementController::class,'index']);
    Route::get('categorieAbonnements/public/{slug}', [CategorieAbonnementController::class,'show']);

    Route::get('abonnements/public', [AbonnementController::class,'index']);
    Route::get('abonnements/public/{slug}', [AbonnementController::class,'show']);

    Route::post('accompagnements/public', [AccompagnementController::class, 'store']);

    Route::post('demandeDevis/public', [Controller::class, 'demandeDevis']);
    Route::post('campagnes/public', [CampagneController::class, 'demandeDevis']);



    Route::resources(['abonnements' => AbonnementController::class]);
    //Route::resources(['categorieAbonnements' => CategorieAbonnementController::class]);
    //Route::resources(['accompagnements' => AccompagnementController::class]);


    //Route::middleware([])->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        Route::get('/users', [AuthController::class,'index']);
        Route::get('/users/auth', [AuthController::class,'userAuth']);
        Route::post('/users/update', [AuthController::class,'update']);
        Route::post('/users/changePassword', [AuthController::class,'changePassword']);
        Route::post('/users/get', [AuthController::class,'userBy']);
        Route::post('/users/disable', [AuthController::class,'disable']);
        Route::post('/publicites/docs', [PubliciteController::class,'storeFile']);
        Route::post('/devis/docs', [DevisController::class,'storeFile']);
        Route::get('/campagnes/docs', [CampagneController::class,'getFile']);
        Route::resources([
            'categorieMedias' => CategorieMediaController::class,
            'medias' => MediaController::class,
            'mediaTarifs' => MediaTarifController::class,
            'mediaProduits' => MediaProduitController::class,
            'mediaProduitOptions' => MediaProduitOptionController::class,
            'campagnes' => CampagneController::class,
            'publicites' => PubliciteController::class,
            'campagneOptions' => CampagneOptionController::class,
            'categorieFiltres' => CategorieFiltreController::class,
            'filtres' => FiltreController::class,
            'devis' => DevisController::class,
            'categorieAbonnements' => CategorieAbonnementController::class,
            //'abonnements' => AbonnementController::class,
            'accompagnements' => AccompagnementController::class,
            'messages' => MessageController::class,
            'entreprises' => EntrepriseController::class,
        ]);
    });

    //Route::get('/mediaProduits', [MediaProduitController::class, 'index']);
    

});
