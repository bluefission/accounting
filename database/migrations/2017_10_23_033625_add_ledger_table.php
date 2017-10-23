<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLedgerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('line_items', function(Blueprint $table) {
            $table->increments('id');
            $table->enum('entry_type', ['Debit','Credit']);
            $table->decimal('amount', 5, 2);
            $table->timestamps();
        });

        Schema::table('orders', function(Blueprint $table) {
            $table->integer('line_item_id')
                ->unsigned()
                ->foreign('line_item_id')
                ->references('id')->on('line_items')
                ->onDelete('cascade');
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
        Schema::dropIfExists('line_item');
        Schema::table('orders', function(Blueprint $table) {
            $table->dropColumn('line_item_id');
        });
    }
}
