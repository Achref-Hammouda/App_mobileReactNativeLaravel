<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;
use App\Mail\ResetPasswordMail;

class ForgotPasswordController extends Controller
{
    //
    public function sendResetLinkEmail(Request $request)
    {
        //$request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé',
                'success' => false
            ]);
        }
        $email = $request->email;
        if (DB::table('password_resets')->where('email', $email)->first()) {
            DB::table('password_resets')->where('email', $email)->delete();
        }

        $email = $request->email;
        $token = Str::random(6); // Générer un token de 6 caractères

        // Enregistrez le token dans la base de données
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => now()
        ]);
        Mail::to($email)->send(new ResetPasswordMail($token));
        // Envoyez l'e-mail avec le token de réinitialisation
        // $resetLink = url('/reset-password/' . $token);
        // Mail::to($email)->send(new ResetPasswordMail($resetLink));

        return response()->json([
            'message' => 'Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse.',
            'success' => true
        ], 200);
    }

    public function verifyToken(Request $request)
    {
        /* $request->validate([
            'email' => 'required|email',
            'token' => 'required|string|min:6', // Assuming the token is 6 characters long
        ]);*/

        $email = $request->email;
        $token = $request->token;

        // Check if the given email and token combination exists in the password_resets table
        $resetRecord = DB::table('password_resets')
            ->where('email', $email)
            ->where('token', $token)
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'message' => 'Invalid token or email.',
                'success' => false
            ]);
        }

        // Token is valid, so you can implement your logic for password reset here
        // For example, you can redirect the user to a password reset page.

        // Once the token is verified, you might want to delete the record from the password_resets table to ensure it can't be used again.
        // You can add this line before redirecting or performing password reset.
        DB::table('password_resets')->where('email', $email)->delete();

        return response()->json([
            'message' => 'Token verified successfully.',
            'success' => true
        ], 200);
    }
}
