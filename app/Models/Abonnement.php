<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonnement extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "price",
        "avantage",
        "categorie",
        "description",
        "categorie_abonnement_id",
        "slug",
        "is_deleted",
    ];

    public function categorieAbonnement(){
        return $this->belongsTo(CategorieAbonnement::class);
    }
}