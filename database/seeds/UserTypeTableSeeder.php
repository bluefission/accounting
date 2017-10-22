<?php

use Illuminate\Database\Seeder;

class UserTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $types = ['User', 'Admin'];

        foreach ( $types as $type ) {
	        DB::table('user_types')->insert([
	            'name' => $type
	        ]);
		}
    }
}
