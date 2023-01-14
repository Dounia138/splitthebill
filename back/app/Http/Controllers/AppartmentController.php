<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Appartment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

function findResidents(Appartment $appartment) {
    $appartment['residents'] = User::where('appartment_id', $appartment->id)->get();
    return $appartment;
}

class AppartmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAppartment(Request $request)
    {
        $user = Auth::user();
        $appartment = $user->appartment;

        if ($appartment === null) {
            abort(404);
        }

        findResidents($appartment);

        return response()->json([
            'appartment' => $appartment
        ]);
    }

    public function create()
    {
        $appartment = Appartment::create();
        findResidents($appartment);

        return response()->json([
            'appartment' => $appartment
        ]);
    }

    public function setAppartment(Request $request)
    {
        $request->validate([
            'appartment_id' => 'required|uuid'
        ]);

        $user = Auth::user();
        $appartment = Appartment::where('uuid', $request->input('appartment_id'))->first();

        if ($appartment === null) {
            abort(404);
        }

        $user->appartment_id = $appartment->id;
        $user->save();
        return response()->json([], 204);
    }

    public function delete()
    {
        $user = Auth::user();
        $user->appartment_id = null;
        $user->save();
        return response()->json([], 204);
    }
}
