<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "type_name",
        "type_id",
        "url",
        "description",
        "slug",
        "is_deleted",
        "user_id",
    ];
}
