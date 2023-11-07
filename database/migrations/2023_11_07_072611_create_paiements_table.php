<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->string("transaction_id")->nullable();
            $table->string("date")->nullable();
            $table->string("montant")->nullable();
            $table->string("numero_paiement")->nullable();
            $table->string("email")->nullable();
            $table->string("nom")->nullable();
            $table->string("prenom")->nullable();
            $table->string("etat")->nullable();
            $table->string("type")->nullable();
            $table->string("operator_id")->nullable();
            $table->string("operator_name")->nullable();
            $table->string("token_d")->nullable();
            $table->string("token_r")->nullable();
            $table->string("slug")->nullable();
            $table->boolean("is_deleted")->default(false)->nullable();

            $table->unsignedBigInteger('devis_id');
            $table->foreign('devis_id')
                    ->references('id')
                    ->on('devis')
                    ->onDelete('restrict')
                    ->onUpdate('restrict');
            $table->timestamps();
        });
    }
 
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paiements');
    }
};
