<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validateData = Validator::make($request->all(), [
            "username" => "string|required",
            "username" => "string|required"
        ]);

        if ($validateData->fails()) {
            return response()->json([
            "message" => "invalid fields",
            "error" => $validateData->errors()
        ], 422);
        }

        $credentials = $request->only("username", "password");

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken("auth_token")->plainTextToken;

            return response()->json([
                "message" => "Login Success",
                "token" => $token,
                "user" => $user
            ]);
        }


        return response()->json([
            "message" => "Wrong Password or Username"
        ], 401);
    }

    public function logout(Request $request) {
        if (!$request->user()) {
            return response()->json([
                "message" => "Unauthenticated"
            ], 401);
        }

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message" => "logout succsess"
        ]);
    }

    public function me(Request $request) {
        if (!$request->user()) {
            return response()->json([
                "message" => "Unauthenticated"
            ], 401);
        }

        return response()->json([
            "message" => "get user data",
            "user" => $request->user()
        ]);
    }

}
