<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conge extends Model
{
    use HasFactory;
    protected $fillable = [
        'type_conge',
        'date_debut',
        'date_fin',
        'type_date',
        'user_id',
        'description',
        'etat',
    ];

    //methode
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
