<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('paiement/public/entrepise', [Controller::class, 'entreprise'])->name("entreprise");
Route::get('paiement/public/{slug}', [Controller::class, 'paiement']);
Route::get('statut/public', [Controller::class, 'statut']);
Route::view('{path}', 'welcome')->where('path', '([A-z\d\-\/_.]+)?');

