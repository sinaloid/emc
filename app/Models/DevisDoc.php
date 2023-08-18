<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevisDoc extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "url",
        "slug",
        "is_deleted",
        "devis_id",
    ];
}
