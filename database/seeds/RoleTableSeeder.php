<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
    	$types = ['Customer', 'Employee', 'Manager', 'Accountant', 'Boss'];

        foreach ( $types as $type ) {
	        DB::table('roles')->insert([
	            'name' => $type
	        ]);
		}
    }
}
