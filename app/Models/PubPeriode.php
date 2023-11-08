<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PubPeriode extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug",
        "date",
        "time",
        "is_used",
        "is_deleted",
        "publicite_id",
    ];

    public function publicite() {

        return $this->belongsTo(Publicite::class);
    }
}
