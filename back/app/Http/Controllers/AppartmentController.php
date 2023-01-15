<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Appartment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AppartmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAppartment()
    {
        $user = Auth::user();
        $appartment = $user->appartment;

        if ($appartment === null) {
            abort(404);
        }

        return response()->json([
            'appartment' => $appartment
        ]);
    }

    public function create()
    {
        $appartment = Appartment::create();

        $user = Auth::user();
        $user->appartment_id = $appartment->id;
        $user->save();

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

    public function unsetAppartment(Request $request, $user_id)
    {
        $user = User::find($user_id);

        Gate::authorize('admin-or-owner', [$user, $user->appartment]);

        $user->appartment_id = null;
        $user->save();
        return response()->json([], 204);
    }
}
