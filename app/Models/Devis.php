<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    use HasFactory;
    protected $fillable = [
        "reference",
        "price",
        "status",
        "description",
        "startDate",
        "endDate",
        "slug",
        "is_deleted",
        "campagne_id",
    ];
}
