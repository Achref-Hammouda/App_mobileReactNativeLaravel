<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('nom');
            $table->string('prenom');
            $table->string('telephone');
            $table->string('role');
            $table->decimal('solde_de_conge', 8, 2)->default(0);
            $table->unsignedBigInteger('super_herarchie_id')->nullable();
            $table->string('imageName')->nullable();
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('super_herarchie_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Supprimez la clé étrangère avant de supprimer la colonne user_id
            $table->dropForeign(['super_herarchie_id']);

            // Supprimez la colonne user_id
            $table->dropColumn('super_herarchie_id');
        });
        Schema::dropIfExists('users');
    }
}
