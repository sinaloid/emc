<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaVille extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "is_deleted",
        "media_id",
        "ville_id",
    ];

    public function media(){
        return $this->belongsTo(Media::class);
    }
    public function ville(){
        return $this->belongsTo(Ville::class);
    }
}
