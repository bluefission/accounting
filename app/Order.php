<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
	// protected $table = '';
    //
    public function items() {
        // return "Hello";
    	return $this->hasMany('App\OrderItems');
    }
}
