<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users/login', [AuthController::class, 'login']);
Route::post('/users/register', [AuthController::class, 'register']);
Route::post('/users/me/logout', [AuthController::class, 'logout']);
Route::get('/users/me/refresh', [AuthController::class, 'refresh']);

Route::get('/users/me/appartment', [AppartmentController::class, 'getAppartment']);
Route::post('/appartments', [AppartmentController::class, 'create']);
Route::put('/users/me/appartment', [AppartmentController::class, 'setAppartment']);
Route::delete('/users/me/appartment',  [AppartmentController::class, 'delete']);
