<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
	// protected $table = '';
    //
    public function order() {
        // return "Hello";
    	return $this->belongsTo('App\Order');
    }
}
