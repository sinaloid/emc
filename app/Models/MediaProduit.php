<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaProduit extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "description",
        "image",
        "slug",
        "price",
        "is_deleted",
        "media_id",
        'latitude',
        'longitude',
        'status',
    ];

    public function scopeSearch($query, $term)
    {
        return $query->where('name', 'like', "%{$term}%")
            ->orWhere('price', 'like', "%{$term}%")
            ->orWhere('description', 'like', "%{$term}%");
    }

    public function publicites(){
        return $this->hasMany(Publicite::class);
    }

    public function periodes(){
        return $this->hasMany(Periode::class);
    }

    public function mediaProduitOptions(){
        return $this->hasMany(MediaProduitOption::class);
    }

    public function media(){
        return $this->belongsTo(Media::class);
    }
}
