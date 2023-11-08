<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicite extends Model
{
    use HasFactory;
    protected $fillable = [
        "slug",
        "is_deleted",
        "campagne_id",
        "media_produit_id",
        //"startDate",
        //"endDate",
        "status",
    ];

    public function campagne(){
        return $this->belongsTo(Campagne::class);
    }

    public function mediaProduit() {

        return $this->belongsTo(MediaProduit::class);
    }

    public function publiciteDocs() {

        return $this->hasMany(PubliciteDoc::class);
    }

    public function pubPeriodes(){
        return $this->hasMany(PubPeriode::class);
    }
}
