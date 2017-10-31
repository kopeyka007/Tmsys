<?php
namespace App\Http\Controllers;

use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Auth;
use App\User;

class AuthController extends Controller
{
    public function signin($post = [])
    {
        $validator = $this->validate(request(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ( ! $validator->fails())
        {
            $auth = ['email' => $post['email'], 'password' => $post['password']];
            if (Auth::validate($auth))
            {
                Auth::attempt($auth);
                return TRUE;
            }
            else
            {
                $this->message('Incorect username or password');
                return FALSE;
            }
        }

        return FALSE;
    } 

    public function signout()
    {
        Auth::logout();        
        return TRUE;
    } 
}

