<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LineItem extends Model
{
	protected $fillable = array('id','label', 'entry_type','amount','comment');
	// protected $table = '';
    //
}
