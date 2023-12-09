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
        Schema::create('entreprises', function (Blueprint $table) {
            $table->id();
            $table->string("denomination")->nullable();
            $table->string("forme_juridique")->nullable();
            $table->string("regime_imposition")->nullable();
            $table->string("ifu")->nullable();
            $table->string("rccm")->nullable();
            $table->string("boite_postale")->nullable();
            $table->string("telephone")->nullable();
            $table->string("situation_geo")->nullable();
            $table->string("type_entreprise")->nullable();
            $table->string("secteur_activite")->nullable();
            $table->string("nom_entreprise")->nullable();
            $table->string("slug");
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
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
        Schema::dropIfExists('entreprises');
    }
};
