<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaTarif extends Model
{
    use HasFactory;
    protected $fillable = [
        "price",
        "period",
        "slug",
        "is_deleted",
        "media_id"
    ];
}
