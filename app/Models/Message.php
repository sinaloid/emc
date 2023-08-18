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
        "type",
        "receiver_email",
        "slug",
        "is_deleted",
        "sender_id",
        "receiver_id",
        "accompagnement_id"
    ];

    public function receiver(){
        return $this->belongsTo(User::class);
    }
    public function sender(){
        return $this->belongsTo(User::class);
    }
    public function messageDocs(){
        return $this->hasMany(MessageDoc::class);
    }
    public function accompagnement(){
        return $this->belongsTo(Accompagnement::class);
    }
}
