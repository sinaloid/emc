<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return                     new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('abonnements', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("price");
            $table->text("avantage");
            $table->text("description");
            $table->string("slug");
            $table->boolean("is_deleted");

            $table->unsignedBigInteger('categorie_abonnement_id');
            $table->foreign('categorie_abonnement_id')
                    ->references('id')
                    ->on('categorie_abonnements')
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
        Schema::dropIfExists('abonnements');
    }
};
