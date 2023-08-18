<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\UpdateSoldeDeCongeMail;
use App\Models\PushToken;
use App\Http\Services\ExpoService;
use Carbon\Carbon;

class UpdateSoldeDeConge extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:solde_de_conge';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the "solde_de_conge" column in the "users" table by adding 1.83 once at 01 of every month.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Get the first day of the current month
        //$startOfMonth = Carbon::now()->startOfMonth();
        /*if (Carbon::now()->day != 30) {
            return;
        }*/
        // Get all users
        $usersToUpdate = User::all();
        $soldeAdding = 1.83;
        foreach ($usersToUpdate as $user) {
            // Update the "solde_de_conge" column and add 7 to its current value
            $user->solde_de_conge += $soldeAdding;
            $user->save();
            $expoService = new ExpoService();
            $recipients = $user->pushTokens->pluck('token')->toArray();
            $title = "{$user->nom} {$user->prenom}";
            $body = "votre solde a été augmenté de {$soldeAdding}";
            $expoService->sendPushNotification($recipients, $title, $body);
            Mail::to($user->email)->send(new UpdateSoldeDeCongeMail($user));
        }



        $this->info('Column updated successfully for ' . count($usersToUpdate) . ' users.');
    }
}
