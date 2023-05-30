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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("description");
            $table->string("image");
            $table->string("slug");
            $table->boolean("is_deleted");

            $table->unsignedBigInteger('categorie_media_id')->nullable();
            $table->foreign('categorie_media_id')
                    ->references('id')
                    ->on('categorie_media')
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
        Schema::dropIfExists('media');
    }
};
