<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageDoc extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "url",
        "slug",
        "is_deleted",
        "message_id",
    ];
}
