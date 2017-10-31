<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (request()->is('view/pages/admin*'))
        {
            if (Auth::check())
            {
                return $next($request);
            } 
            else 
            {
                return redirect('/login');
            } 
        } 

        return $next($request);
    }
}
