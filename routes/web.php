<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login');
});

Auth::routes();

// Route::view('register', 'register')
// 	->name('register')
// 	->middleware('auth')
// ;

Route::view('home', 'home')
	->name('home')
	->middleware('auth')
;

Route::view('orders', 'orders')
	->name('orders')
	->middleware('auth')
;

Route::view('settings', 'settings')
	->name('settings')
	->middleware('auth')
;

Route::view('sales', 'sales')
	->name('sales')
	->middleware('auth')
;

Route::view('inventory', 'inventory')
	->name('inventory')
	->middleware('auth')
;

Route::view('expenses', 'expenses')
	->name('expenses')
	->middleware('auth')
;

// Route::view('salaries', 'salaries')
// 	->name('salaries')
// 	->middleware('auth')
// ;

Route::view('employees', 'employees')
	->name('employees')
	->middleware('auth')
;

Route::view('customers', 'customers')
	->name('customers')
	->middleware('auth')
;

Route::view('reports', 'reports')
	->name('reports')
	->middleware('auth')
;

// Route::get('/home', 'HomeController@index')->name('home');
