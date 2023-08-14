<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "date",
        "time",
        "is_used",
        "is_deleted",
        "media_produit_id",
    ];

    public function mediaProduit() {

        return $this->belongsTo(MediaProduit::class);
    }
}
