<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;
    protected $fillable = [
        "denomination",
        "forme_juridique",
        "regime_imposition",
        "ifu",
        "rccm",
        "boite_postale",
        "telephone",
        "situation_geo",
        "slug",
        "is_deleted",
        "user_id",
    ];
}
