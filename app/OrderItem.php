<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
	// protected $table = '';
	protected $fillable = array('id','order_id', 'item_id','quantity', 'notes');
    //
    public function order() 
    {
        // return "Hello";
    	return $this->belongsTo('App\Order');
    }

    public function item()
    {
    	// return $this->hasOne('App\Item');
    	return Item::find($this->item_id);
    }
}
