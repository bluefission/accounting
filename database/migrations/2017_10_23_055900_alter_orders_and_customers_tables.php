<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterOrdersAndCustomersTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('customer_id');
            $table->integer('user_id')
                ->unsigned()
                ->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->nullable();
            $table->enum('status', ['Pending','Processing','Done']);
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
        Schema::table('orders', function(Blueprint $table) {
            $table->dropColumn(['user_id', 'status']);
            $table->integer('customer_id')
                ->unsigned()
                ->foreign('customer_id')
                ->references('id')->on('customers')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }
}
