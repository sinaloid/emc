<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accompagnement extends Model
{
    use HasFactory;
    protected $fillable = [
        "lastname",
        "firstname",
        "phone",
        //"budget",
        "startDate",
        "description",
        "slug",
        "is_deleted",
        "status"
    ];
}
