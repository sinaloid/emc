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
        Schema::create('media_villes', function (Blueprint $table) {
            $table->id();
            $table->string("slug");
            $table->boolean("is_deleted");
            
            $table->unsignedBigInteger('media_id');
            $table->foreign('media_id')
                    ->references('id')
                    ->on('media')
                    ->onDelete('restrict')
                    ->onUpdate('restrict');

            $table->unsignedBigInteger('ville_id');
            $table->foreign('ville_id')
                    ->references('id')
                    ->on('villes')
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
        Schema::dropIfExists('media_villes');
    }
};
