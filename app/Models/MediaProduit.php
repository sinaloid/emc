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

    public function publicites(){
        return $this->hasMany(Publicite::class);
    }

    public function media(){
        return $this->belongsTo(Media::class);
    }
}
