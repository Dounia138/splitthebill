<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AppartmentController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\PaymentController;
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

Route::get('/users/me', [UserController::class, 'getMe']);
Route::get('/users/{user_id}', [UserController::class, 'getById']);
Route::patch('/users/{user_id}', [UserController::class, 'update']);

Route::get('/users/me/appartment', [AppartmentController::class, 'getAppartment']);
Route::post('/appartments', [AppartmentController::class, 'create']);
Route::put('/users/me/appartment', [AppartmentController::class, 'setAppartment']);
Route::delete('/users/me/appartment',  [AppartmentController::class, 'delete']);

Route::get('/users/me/appartment/tickets', [TicketController::class, 'findAppartmentTickets']);
Route::post('/users/me/appartment/tickets', [TicketController::class, 'createTicket']);
Route::delete('/users/me/appartment/tickets/{ticket_id}', [TicketController::class, 'deleteTicket']);

Route::get('/users/me/appartment/payments', [PaymentController::class, 'findAppartmentPayments']);
Route::post('/users/me/appartment/payments', [PaymentController::class, 'createPayment']);
