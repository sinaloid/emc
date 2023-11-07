<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        "transaction_id",
        "date",
        "montant",
        "numero_paiement",
        "email",
        "nom",
        "prenom",
        "devis_id",
        "etat",
        "type",
        "operator_id",
        "operator_name",
        "token_d",
        "token_r",
        "slug",
        "is_deleted"
    ];

    public function devis() {

        return $this->belongsTo(Devis::class);
    }
}
