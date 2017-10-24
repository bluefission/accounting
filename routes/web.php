<?php

use \App\Http\Controllers\Api\OrderController;
use \App\Http\Controllers\Api\ExpenseController;
use \App\Http\Controllers\Api\ItemController;
use \App\Http\Controllers\Api\OrderItemController;
use \App\Http\Controllers\Api\AccountController;
use \App\Http\Controllers\Api\SettingController;
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
    // return view('login');
    return redirect('home');
});

Auth::routes();

Route::view('home', 'home')
	->name('home')
	->middleware('auth')
;

Route::view('ledger', 'ledger')
	->name('ledger')
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

Route::view('catalog', 'catalog')
	->name('catalog')
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

// Route::post('register', function() {
// 	dd('okay');
// });

// Route::get('/home', 'HomeController@index')->name('home');
// api
Route::get('api/orders', 'Api\OrderController@index');
Route::get('api/orders/{order}', 'Api\OrderController@show');
Route::post('api/orders', 'Api\OrderController@store');
Route::post('api/orders/add', 'Api\OrderController@add');
Route::post('api/orders/edit', 'Api\OrderController@edit');
Route::put('api/orders/{order}', 'Api\OrderController@update');
Route::delete('api/orders/{order}', 'Api\OrderController@delete');

Route::get('api/expenses', 'Api\ExpenseController@index');
Route::get('api/expenses/{expense}', 'Api\ExpenseController@show');
Route::post('api/expenses', 'Api\ExpenseController@store');
Route::put('api/expenses/{expense}', 'Api\ExpenseController@update');
Route::delete('api/expenses/{expense}', 'Api\ExpenseController@delete');

Route::get('api/items', 'Api\ItemController@index');
Route::get('api/items/{item}', 'Api\ItemController@show');
Route::post('api/items', 'Api\ItemController@store');
Route::put('api/items/{item}', 'Api\ItemController@update');
Route::delete('api/items/{item}', 'Api\ItemController@delete');

Route::get('api/accounts', 'Api\AccountController@index');
Route::get('api/accounts/{account}', 'Api\AccountController@show');
Route::post('api/accounts', 'Api\AccountController@store');
Route::put('api/accounts/{account}', 'Api\AccountController@update');
Route::delete('api/accounts/{account}', 'Api\AccountController@delete');

Route::get('api/users', 'Api\UserController@index');
Route::get('api/users/{account}', 'Api\UserController@show');
Route::post('api/users', 'Api\UserController@store');
Route::put('api/users/{account}', 'Api\UserController@update');
Route::delete('api/users/{account}', 'Api\UserController@delete');

Route::get('api/settings', 'Api\SettingController@index');
Route::get('api/settings/{setting}', 'Api\SettingController@show');
Route::post('api/settings', 'Api\SettingController@store');
Route::put('api/settings/{setting}', 'Api\SettingController@update');
Route::delete('api/settings/{setting}', 'Api\SettingController@delete');

Route::get('api/line_items', 'Api\LineItemController@index');
Route::get('api/line_items/{line_item}', 'Api\LineItemController@show');
Route::post('api/line_items', 'Api\LineItemController@store');
Route::put('api/line_items/{line_item}', 'Api\LineItemController@update');
Route::delete('api/line_items/{line_item}', 'Api\LineItemController@delete');