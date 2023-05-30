<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "description",
        "image",
        "slug",
        "is_deleted",
        "categorie_media_id"
    ];

    public function mediaProduits(){
        return $this->hasMany(MediaProduit::class);
    }

    public function categorieMedia(){
        return $this->belongsTo(CategorieMedia::class);
    }
}
