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
        Schema::create('pub_periodes', function (Blueprint $table) {
            $table->id();
            $table->string("slug");
            $table->date("date");
            $table->string("time");
            $table->boolean("is_used")->default(false);
            $table->boolean("is_deleted")->default(false);

            $table->unsignedBigInteger('publicite_id');
            $table->foreign('publicite_id')
                    ->references('id')
                    ->on('publicites')
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
        Schema::dropIfExists('pub_periodes');
    }
};
