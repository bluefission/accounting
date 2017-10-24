<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
	// protected $table = '';
	protected $fillable = array('id','user_id', 'status','line_item_id');
    //
    public function items() 
    {
        // return "Hello";
    	// return $this->hasMany('App\OrderItem');
    	return OrderItem::where('order_id', $this->id)->get();
    }

    public function total()
    {
    	$items = $this->items();
    	$cost = 0;
    	foreach ($items as $item) {
    		$cost += $item->item()->cost * $item->quantity;
    	}

    	return $cost;
    }
}
