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
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string("reference");
            $table->string("price");
            $table->string("status")->nullable();
            $table->text("description");
            $table->date("startDate");
            $table->date("endDate");
            $table->string("slug");
            $table->boolean("is_deleted");

            $table->unsignedBigInteger('campagne_id');
            $table->foreign('campagne_id')
                    ->references('id')
                    ->on('campagnes')
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
        Schema::dropIfExists('devis');
    }
};
