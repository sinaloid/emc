<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorieMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "image",
        "slug",
        "is_deleted",
    ];

    public function medias(){
        return $this->hasMany(Media::class);
    }
}
