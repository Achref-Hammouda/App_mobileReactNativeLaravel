<?php

namespace App\Http\Controllers;



use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Mail\CongeCreated;
use App\Mail\UpdateEtatConge;
use App\Models\PushToken;
use App\Models\Conge;
use App\Models\User;
use Carbon\Carbon;
use App\Http\Services\ExpoService;



class CongeController extends Controller
{
    //
    public function store(Request $request)
    {
        $conge = new Conge;
        $conge->type_conge = $request->input('type_conge');
        $conge->date_debut = $request->input('date_debut');
        $conge->date_fin = $request->input('date_fin');
        $conge->type_date = $request->input('type_date');
        $conge->user_id = $request->input('user_id');
        $conge->description = $request->input('description');
        $conge->etat = 'attent';
        $conge->save();
        $user = $conge->user;
        $super_herarchie_id = $user->super_herarchie_id;
        $superior = User::find($super_herarchie_id);

        $tokens = PushToken::pluck('token')->toArray();

        $expoService = new ExpoService();
        $recipients = $tokens;
        $title = "{$user->nom} {$user->prenom}";
        $body = "a demende un congé";
        $expoService->sendPushNotification($recipients, $title, $body);


        if ($superior) {
            Mail::to($superior->email)->send(new CongeCreated($conge, $superior));
        }

        return response()->json(['message' => 'congé créé avec succès'], 201);
    }

    public function index()
    {
        $conges = Conge::all();
        return response()->json($conges);
    }

    public function getByUserId($user_id)
    {
        $conges = Conge::where('user_id', $user_id)->with('user:id,email')->get();
        return response()->json($conges);
    }

    public function getCongesBySuperHerarchieId($super_herarchie_id)
    {
        // Get conges by super_herarchie_id
        $conges = Conge::whereHas('user', function ($query) use ($super_herarchie_id) {
            $query->where('super_herarchie_id', $super_herarchie_id);
        })->where('etat', 'attent')->with('user:id,email,nom,prenom,solde_de_conge,imageName')->get();

        return response()->json($conges);
    }

    public function updateCongeEtat(Request $request, $id)
    {
        // Validate the request data
        /* $request->validate([
            'etat' => 'required|in:valide,refuse,en_attente',
        ]); */
        // Find the conge by ID
        $conge = Conge::findOrFail($id);

        // Update the etat of the conge
        $conge->update([
            'etat' => $request->input('etat'),
        ]);
        // Convertir les valeurs de la base de données en objets Carbon pour les comparer
        $dateDebut = Carbon::parse($conge->date_debut);
        $dateFin = Carbon::parse($conge->date_fin);
        if ($conge->type_date === "demi-jour") {
            $differenceEnJours = 0.5;
        } else {
            $differenceEnJours = ($dateDebut->diffInDays($dateFin)) + 1;
        }
        // Calculer la différence en jours entre les deux dates

        $user = $conge->user;
        $super_herarchie_id = $user->super_herarchie_id;
        $superior = User::find($super_herarchie_id);
        $user->solde_de_conge -= $differenceEnJours;
        $user->save();
        //$user->update(['solde_de_conge' => $solde_de_conge->diffInDays($differenceEnJours)]);
        $expoService = new ExpoService();
        $recipients = $user->pushTokens->pluck('token')->toArray();
        $title = "{$superior->nom} {$superior->prenom}";
        $body = "a {$conge->etat} votre congé";
        $expoService->sendPushNotification($recipients, $title, $body);
        Mail::to($user->email)->send(new UpdateEtatConge($conge, $superior));


        return response()->json([

            'message' => 'Conge etat updated successfully',

            'difference_en_jours' => $differenceEnJours,

        ]);
    }
}
