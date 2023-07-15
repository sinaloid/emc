<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorieAbonnement extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "description",
        "slug",
        "is_deleted",
    ];

    public function abonnements(){
        return $this->hasMany(Abonnement::class);
    }
}
