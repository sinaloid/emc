<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaProduitOption extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "is_deleted",
        "media_produit_id",
        "filtre_id",
    ];
}
