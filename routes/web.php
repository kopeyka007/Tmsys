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

Route::get('/view/{filder}/{file?}/{param?}', function($folder, $file = '', $param = '') {
    return view()->exists($view = $folder.(empty($file) ? '' : '.'.$file)) ? view($view) : view("errors.404");
});

Route::any('api/{unit}/{method}', 'RoutesController@api');

Route::any('{catchall}', function () { 
	return view('main'); 
})->where('catchall', '(.*)');

