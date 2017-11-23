<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kit;
use App\Board;

class SteponeController extends Controller
{
    public function getBoards()
    {
        $kits = Kit::with('boards')->get()->each(function($k){
        	$k->terrace_img = url('storage/' . $k->terrace_img);
        	$k->board_img = url('storage/' . $k->board_img);
        });
        return $kits;
    }
}
