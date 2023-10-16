<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UpdateEtatConge extends Mailable
{
    use Queueable, SerializesModels;

    public $conge;
    public $superior;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($conge, $superior)
    {
        $this->conge = $conge;
        $this->superior = $superior;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.update-etat-conge')->subject("Mise à jour de l'état de la demande de congé");
    }
}
