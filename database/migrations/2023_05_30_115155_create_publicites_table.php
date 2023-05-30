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
        Schema::create('publicites', function (Blueprint $table) {
            $table->id();
            $table->string("slug");
            $table->boolean("is_deleted");
            
            $table->unsignedBigInteger('campagne_id');
            $table->foreign('campagne_id')
                    ->references('id')
                    ->on('campagnes')
                    ->onDelete('restrict')
                    ->onUpdate('restrict');

            $table->unsignedBigInteger('media_produit_id');
            $table->foreign('media_produit_id')
                    ->references('id')
                    ->on('media_produits')
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
        Schema::dropIfExists('publicites');
    }
};
