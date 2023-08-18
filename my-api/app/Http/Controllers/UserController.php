<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json([
                'message' => "Email existe déjà.\nSaisir un autre email.",
                'success' => false
            ]);
        }
        $user = new User;
        $user->email = $request->input('email');
        $user->nom = $request->input('nom');
        $user->prenom = $request->input('prenom');
        $user->password = bcrypt($request->input('password'));
        $user->telephone = $request->input('telephone');
        $user->super_herarchie_id = $request->input('super_herarchie_id');
        $user->role = 'employe'; //$request->input('role');
        $user->save();

        return response()->json(['message' => "Utilisateur créé avec succès"], 201);
    }
    // Méthode pour récupérer tous les utilisateurs
    public function index()
    {
        $users = User::with('superherarchie:id,nom,prenom')->get();

        return response()->json($users);
    }
    // Méthode pour mettre à jour un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }
    // Méthode pour récupérer un utilisateur spécifique
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }
    public function updateEmail(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if (Hash::check($request->password, $user->password)) {
            $user->update(['email' =>     $request->input('email')]);
            $user->save();

            return response()->json(['message' => 'Email utilisateur mis à jour avec succès']);
        } else {
            return response()->json(['message' => 'Mot de passe incorrect']);
        }
    }

    public function updateNom(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update(['nom' =>     $request->input('value')]);
        //$user->save();
        //$user->nom = $request->input('nom');

        if ($user->save()) {
            return response()->json([
                'message' => 'Nom utilisateur mis à jour avec succès',

            ], 201);
        }
    }

    public function updatePrenom(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update(['prenom' =>     $request->input('value')]);
        $user->save();

        return response()->json(['message' => 'Prénom utilisateur mis à jour avec succès']);
    }


    public function updatePasswordById(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if (Hash::check($request->password, $user->password)) {
            $user->update(['password' => bcrypt($request->input('newPassword'))]);
            $user->save();

            return response()->json(['message' => 'Mot de passe utilisateur mis à jour avec succès']);
        } else {
            return response()->json(['message' => 'Mot de passe incorrect']);
        }
    }


    public function updatePasswordEmail(Request $request)
    {
        //$user = User::findOrFail($id);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        $user->password = bcrypt($request->input('password'));
        $user->save();

        return response()->json(['message' => 'Mot de passe utilisateur mis à jour avec succès']);
    }

    public function updateTelephone(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update(['telephone' =>     $request->input('value')]);
        $user->save();

        return response()->json(['message' => 'Téléphone utilisateur mis à jour avec succès']);
    }

    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update(['role' =>     $request->input('role')]);
        $user->save();

        return response()->json(['message' => 'Rôle utilisateur mis à jour avec succès']);
    }
    public function updateSuperHerarchieId(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update(['super_herarchie_id' =>     $request->input('super_herarchie_id')]);
        $user->save();

        return response()->json(['message' => 'super_herarchie_id utilisateur mis à jour avec succès']);
    }

    public function getUsersBySuperHierarchyId($superHierarchyId)
    {
        $users = User::where('super_herarchie_id', $superHierarchyId)->get();

        return response()->json(['success' => true, 'users' => $users], 200);
    }

    public function getAdminUsers()
    {
        $superUsers = User::whereIn('role', ['admin', 'superviseur'])->get();
        return response()->json(['success' => true, 'users' => $superUsers], 200);
    }

    // Méthode pour supprimer un utilisateur
    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->json(null, 204);
    }


    //
}
