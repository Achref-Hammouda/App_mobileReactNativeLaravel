<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCongesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conges', function (Blueprint $table) {
            $table->id();
            $table->string('type_conge');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->string('type_date')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('description')->nullable();
            $table->string('etat');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('conges', function (Blueprint $table) {
            // Supprimez la clé étrangère avant de supprimer la colonne user_id
            $table->dropForeign(['user_id']);

            // Supprimez la colonne user_id
            $table->dropColumn('user_id');
        });
        Schema::dropIfExists('conges');
    }
}
