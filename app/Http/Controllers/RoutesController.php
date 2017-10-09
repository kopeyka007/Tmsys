<?php

	namespace App\Http\Controllers;

	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\Auth;

	class RoutesController extends Controller
	{
	    public function api($unit, $method)
	    {
    		$post = request()->all();
    		unset($post['_method'], $post['_token'], $post['pivot']);
		    $controller = app()->make('\App\Http\Controllers\\'.ucfirst($unit).'Controller');    
		    $response = $controller->callAction($method, ['post' => $post]);                    
            return json_encode($response, JSON_NUMERIC_CHECK);
	    }
	}