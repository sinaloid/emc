<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campagne extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "startDate",
        "endDate",
        "status",
        "file",
        "slug",
        "budget",
        "is_deleted",
        "user_id",
    ];

    public function publicites() {

        return $this->hasMany(Publicite::class);
    }

    public function devis() {

        return $this->hasMany(Devis::class);
    }

    public function user() {

        return $this->belongsTo(User::class);
    }
}
