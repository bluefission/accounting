<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
	// protected $table = '';
	protected $fillable = array('id','cost', 'item_type','notes','name');
    //
}
