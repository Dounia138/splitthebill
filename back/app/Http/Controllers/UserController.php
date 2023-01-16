<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getById(Request $request, $user_id)
    {
        $user = User::find($user_id);

        if ($user === null) {
            abort(404);
        }

        return response()->json([
            'user' => $user,
        ]);
    }

    public function getMe()
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user,
        ]);
    }

    public function deleteMe()
    {
        $user = Auth::user();
        $user->delete();
    }

    public function update(Request $request, $user_id)
    {
        $user = User::find($user_id);

        if (count($request->all()) === 1 && array_key_exists('is_admin', $request->all())) {
            Gate::authorize('admin', [$user->appartment]);
        } else if (count($request->all()) > 1 && array_key_exists('is_admin', $request->all())) {
            abort(403, 'You can only update the is_admin field.');
        } else {
            Gate::authorize('owner', [$user]);
        }

        $user->update($request->all());
        return response()->json([
            'user' => $user,
        ]);
    }
}
