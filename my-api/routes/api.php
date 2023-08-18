<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CongeController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ImageController;
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



Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::put('/users/{id}/email', [UserController::class, 'updateEmail']);
Route::put('/users/{id}/nom', [UserController::class, 'updateNom']);
Route::put('/users/{id}/prenom', [UserController::class, 'updatePrenom']);
Route::put('/users/{id}/password', [UserController::class, 'updatePasswordById']);
Route::put('/users/{id}/telephone', [UserController::class, 'updateTelephone']);
Route::put('/users/{id}/role', [UserController::class, 'updateRole']);
Route::put('/users/{id}/superHierarchyId', [UserController::class, 'updateSuperHerarchieId']);
Route::put('/update-password', [UserController::class, 'updatePasswordEmail']);
Route::get('users/by-superhierarchy/{superHierarchyId}', [UserController::class, 'getUsersBySuperHierarchyId']);

Route::get('/admin-users', [UserController::class, 'getAdminUsers']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
//Route::put('/users/{id}', [UserController::class, 'update']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/conges', [CongeController::class, 'store']);
Route::get('/conges', [CongeController::class, 'index']);
Route::get('/conges/user/{user_id}', [CongeController::class, 'getByUserId']);
Route::get('/conges/superherar/{super_herarchie_id}', [CongeController::class, 'getCongesBySuperHerarchieId']);
Route::put('/conges/{id}/etat', [CongeController::class, 'updateCongeEtat']);

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/verify-token', [ForgotPasswordController::class, 'verifyToken']);

Route::post('/upload-image/{user_id}', [ImageController::class, 'uploadImage']);
Route::get('/get-image/{imageName}', [ImageController::class, 'getImage']);
Route::delete('/delete-images/{imageName}', [ImageController::class, 'deleteImage']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
