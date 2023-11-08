<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'lastname',
        'firstname',
        'status',
        'image',
        'number',
        'slug',
        'email',
        'isActive',
        'email_verified',
        'number_verified',
        'password',
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

    public function medias(){
        return $this->hasMany(Media::class);
    }
    public function campagnes(){
        return $this->hasMany(Campagne::class);
    }
    public function messages(){
        return $this->hasMany(Message::class,"receiver_id");
    }
    public function entreprises(){
        return $this->hasMany(Entreprise::class);
    }
}
