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
        Schema::create('devis_docs', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("url");
            $table->string("slug");
            $table->boolean("is_deleted")->default(false);

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
        Schema::dropIfExists('devis_docs');
    }
};
