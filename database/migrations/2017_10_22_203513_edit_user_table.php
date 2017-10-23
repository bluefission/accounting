<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //


        // Schema::table('users', function (Blueprint $table) {
        //     $table->string('first_name');
        //     $table->string('last_name');
        //     $table->string('phone');

        //     $table->integer('address_id')
        //         ->unsigned()
        //         ->foreign('address_id')
        //         ->references('id')->on('addresses')
        //         ->onDelete('cascade');

        //     $table->integer('role_id')
        //         ->unsigned()
        //         ->foreign('role_id')
        //         ->references('id')->on('roles')
        //         ->onDelete('cascade');

        //     $table->integer('user_type_id')
        //         ->unsigned()
        //         ->nullable()
        //         ->foreign('user_type_id')
        //         ->references('id')->on('user_types')
        //         ->onDelete('cascade');
            
        //     $table->string('entitlements')
        //         ->nullable();
        // });

        Schema::create('accounts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')
                ->unsigned()
                ->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');

            $table->integer('address_id')
                ->unsigned()
                ->foreign('address_id')
                ->references('id')->on('addresses')
                ->onDelete('cascade');

            $table->integer('role_id')
                ->unsigned()
                ->foreign('role_id')
                ->references('id')->on('roles')
                ->onDelete('cascade');

            $table->integer('user_type_id')
                ->unsigned()
                ->nullable()
                ->foreign('user_type_id')
                ->references('id')->on('user_types')
                ->onDelete('cascade');
            
            $table->string('entitlements')
                ->nullable();
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
        //
        Schema::dropIfExists('accounts');
         

        // Schema::table('users', function (Blueprint $table) {
        //     $table->dropColumn(['first_name', 'last_name', 'address_id', 'role_id', 'user_type_id', 'phone', 'entitlements']);
        // });
    }
}
