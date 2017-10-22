<?php

use Illuminate\Database\Seeder;

class SettngsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $settings = ['CURRENCY_NAME'=>'Dollar', 'CURRENCY_SYMBOL'=>'$', 'BUSINESS_NAME'=>'Default'];

        foreach ( $settings as $name=>$value ) {
	        DB::table('settings')->insert([
	            'name' => $name,
	            'value_string' => $value,
	        ]);
		}
    }
}
