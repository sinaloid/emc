<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filtre extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "slug",
        "is_deleted",
        "categorie_filtre_id"
    ];

    public function categorieFiltre(){
        return $this->belongsTo(CategorieFiltre::class);
    }
}
