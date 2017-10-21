<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kit;
use App\Board;

class stepOneController extends Controller
{
    public function getBoards()
    {
        $kits = Kit::with('boards')->get();
        
        return $kits;
    }
}
