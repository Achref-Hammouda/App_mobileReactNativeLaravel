<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PushToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentification réussie
            $user = Auth::user();
            $pushToken = $request->input('push_token');

            // Save the push token to the push_tokens table associated with the user
            if ($pushToken) {
                PushToken::updateOrCreate([
                    'user_id' => $user->id,
                    'token' => $pushToken,
                ]);
            }

            // Retournez les informations de l'utilisateur connecté
            return response()->json([
                'success' => true,
                'user' => $user,
                'message' => 'Connexion réussie'
            ], 200);
        } else {
            // Échec de l'authentification
            return response()->json([
                'success' => false,
                'message' => 'email ou mot de passe incorrect'
            ],);
        }
    }

    public function logout(Request $request)
    {
        // Revoke the user's token, effectively logging them out
        //Auth::logout();

        // Remove the user's push token
        //$user = Auth::user();
        $user_id = $request->user_id;
        PushToken::where('user_id', $user_id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }
}
