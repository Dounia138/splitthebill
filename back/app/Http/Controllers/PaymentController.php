<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function findAppartmentPayments(Request $request)
    {
        $user = Auth::user();
        $appartment = $user->appartment;

        $residents = User::where('appartment_id', $appartment->id)->get();

        $all_payments = [];
        foreach ($residents as $resident) {
            $resident_payments = Payment::where('payer_id', $resident->id)->get();
            foreach ($resident_payments as $payment) {
                $payment['payer'] = $payment->payer;
                $payment->owesPayment;
                $payment->owesPayment->ticket;
                $payment->owesPayment->ticket->creator;
            }
            $all_payments = array_merge($all_payments, $resident_payments->toArray());
        }

        return response()->json([
            'payments' => $all_payments,
        ]);
    }

    public function createPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'owes_payment_id' => 'required|numeric'
        ]);

        $user = Auth::user();
        $payment = Payment::create([
            'amount' => $request->amount,
            'payer_id' => $user->id,
            'for_owes_payment_id' => $request->owes_payment_id,
            'appartment_id' => $user->appartment->id
        ]);

        $payment['payer'] = $payment->payer;
        $payment->owesPayment;
        $payment->owesPayment->ticket;
        $payment->owesPayment->ticket->creator;

        return response()->json([
            'payment' => $payment
        ]);
    }
}
