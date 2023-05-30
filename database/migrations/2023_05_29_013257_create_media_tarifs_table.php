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
        Schema::create('media_tarifs', function (Blueprint $table) {
            $table->id();
            $table->string("price");
            $table->string("period");
            $table->string("slug");
            $table->boolean("is_deleted");

            $table->unsignedBigInteger('media_id')->nullable();
            $table->foreign('media_id')
                    ->references('id')
                    ->on('media')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
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
        Schema::dropIfExists('media_tarifs');
    }
};
