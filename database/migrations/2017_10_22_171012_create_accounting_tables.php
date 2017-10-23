<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountingTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function(Blueprint $table) {
            $table->increments('id');
            $table->string('line_1');
            $table->string('line_2')->nullable();
            $table->string('city');
            $table->string('region');
            $table->string('postal_code');
            $table->string('country');

            $table->timestamps();
        });

        Schema::create('customers', function(Blueprint $table) {
            $table->increments('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');

            $table->integer('address_id')
                ->unsigned()
                ->foreign('address_id')
                ->references('id')->on('addresses')
                ->onDelete('cascade');
            $table->timestamps();

        });
        Schema::create('line_items', function(Blueprint $table) {
            $table->increments('id');
            $table->enum('entry_type', ['Debit','Credit']);
            $table->decimal('amount', 5, 2);
            $table->string('label')->nullable();
            $table->string('comment')->nullable();
            $table->timestamps();
        });

        Schema::create('orders', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')
                ->unsigned()
                ->foreign('user_id')
                ->references('id')->on('customers')
                ->onDelete('cascade')
                ->nullable();
            $table->enum('status', ['Pending','Processing','Done']);
            $table->integer('line_item_id')
                ->unsigned()
                ->foreign('line_item_id')
                ->references('id')->on('line_items')
                ->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('items', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->decimal('cost', 5, 2);
            $table->enum('item_type', ['Product', 'Service']);
            $table->text('notes');
            $table->timestamps();
        });

        Schema::create('order_items', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('order_id')
                ->unsigned()
                ->foreign('order_id')
                ->references('id')->on('orders')
                ->onDelete('cascade');

            $table->integer('item_id')
                ->unsigned()
                ->foreign('item_id')
                ->references('id')->on('items')
                ->onDelete('cascade');

            $table->integer('quantity');
            $table->text('notes');

            $table->timestamps();
        });

        Schema::create('products', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('item_id')
                ->unsigned()
                ->foreign('item_id')
                ->references('id')->on('items')
                ->onDelete('cascade');
            $table->integer('stock');
            $table->dateTime('expiry');

            $table->timestamps();
        });

        Schema::create('services', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('item_id')
                ->unsigned()
                ->foreign('item_id')
                ->references('id')->on('items')
                ->onDelete('cascade');
            $table->integer('duration');
            
            $table->timestamps();
        });

        Schema::create('settings', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('value_string');
            $table->integer('value_int');
            $table->text('value_extra');
            $table->timestamps();
        });

        Schema::create('user_types', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('roles', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

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
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('items');
        Schema::dropIfExists('line_item');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('products');
        Schema::dropIfExists('services');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('user_types');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('accounts');

    }
}
