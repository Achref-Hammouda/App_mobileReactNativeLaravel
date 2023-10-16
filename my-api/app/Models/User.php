<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.        //'name',
     *
     * @var array<int, string>
     */
    protected $fillable = [

        'email',
        'nom',
        'prenom',
        'password',
        'telephone',
        'role',
        'solde_de_conge',
        'super_herarchie_id',
        'imageName',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function conges()
    {
        return $this->hasMany(Conge::class);
    }

    public function pushTokens()
    {
        return $this->hasMany(PushToken::class);
    }
    public function superHerarchie()
    {
        return $this->belongsTo(User::class, 'super_herarchie_id');
    }
    public function subordinates(): HasMany
    {
        return $this->hasMany(User::class, 'super_herarchie_id');
    }
    // Vos autres configurations du modèle User ici

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('profile-image')
            ->singleFile();
    }
}
