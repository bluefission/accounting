<?php

use Illuminate\Http\Request;

use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\SettingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// $order = new OrderController();
// dd($order->index(new Request));
Route::get('api/orders', 'OrderController@index');
Route::get('api/orders/{order}', 'OrderController@show');
Route::post('api/orders', 'OrderController@store');
Route::put('api/orders/{order}', 'OrderController@update');
Route::delete('api/orders/{order}', 'OrderController@delete');

Route::get('api/expenses', 'ExpenseController@index');
Route::get('api/expenses/{expense}', 'ExpenseController@show');
Route::post('api/expenses', 'ExpenseController@store');
Route::put('api/expenses/{expense}', 'ExpenseController@update');
Route::delete('api/expenses/{expense}', 'ExpenseController@delete');

Route::get('api/items', 'ItemController@index');
Route::get('api/items/{item}', 'ItemController@show');
Route::post('api/items', 'ItemController@store');
Route::put('api/items/{item}', 'ItemController@update');
Route::delete('api/items/{item}', 'ItemController@delete');

Route::get('api/accounts', 'AccountController@index');
Route::get('api/accounts/{account}', 'AccountController@show');
Route::post('api/accounts', 'AccountController@store');
Route::put('api/accounts/{account}', 'AccountController@update');
Route::delete('api/accounts/{account}', 'AccountController@delete');

Route::get('api/settings', 'SettingController@index');
Route::get('api/settings/{setting}', 'SettingController@show');
Route::post('api/settings', 'SettingController@store');
Route::put('api/settings/{setting}', 'SettingController@update');
Route::delete('api/settings/{setting}', 'SettingController@delete');
