<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampagneOption extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "is_deleted",
        "campagne_id",
        "filtre_id",
    ];
}
