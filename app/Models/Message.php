<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        "subject",
        "message",
        "slug",
        "is_deleted",
        "sender_id",
        "receiver_id"
    ];

    public function receiver(){
        return $this->belongsTo(User::class);
    }
}
