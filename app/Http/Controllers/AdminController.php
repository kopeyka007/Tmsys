<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Kit;
use App\Board;

class AdminController extends Controller
{
    //ADD ONE BOARD
    public function addBoard($post = [])
    {
        $kit = new Kit;

        $kit->board_img = $post['board_img']->store('board');
        $kit->terrace_img = $post['terrace_img']->store('terrace');
        $kit->type_board = $post['type'];
        $kit->save();

        $board = new Board;

        $board->type = $post['type'];
        $board->price = $post['price'];
        $board->name = $post['name'];
        $board->unit = 'MM';
        $board->brand =  $post['brand'];
        $board->width = $post['width'];
        $board->height = $post['height'];
        $board->thickness = $post['thickness'];

        $board->save();
        $kit->boards()->attach($board->id);
    }

    //ADD TWO BOARDS
    public function addBoards($post = [])
    {
        $kit = new Kit;

        $kit->board_img = $post['board_img']->store('board');
        $kit->terrace_img = $post['terrace_img']->store('terrace');
        $kit->type_board = $post['type'];
        $kit->save();

    	$board = new Board;

       	$board->type = $post['type'];
       	$board->price = $post['price'];
       	$board->name = $post['name'];
       	$board->unit = 'MM';
       	$board->brand =  $post['brand'];
       	$board->width = $post['width'];
       	$board->height = $post['height'];
       	$board->thickness = $post['thickness'];

       	$board->save();
        $kit->boards()->attach($board->id);

        $board = new Board;

        $board->type = $post['typeSecond'];
        $board->price = $post['priceSecond'];
        $board->name = $post['nameSecond'];
        $board->unit = 'MM';
        $board->brand =  $post['brandSecond'];
        $board->width = $post['widthSecond'];
        $board->height = $post['heightSecond'];
        $board->thickness = $post['thicknessSecond'];

        $board->save();
        $kit->boards()->attach($board->id);
    }

    //EDIT ONE BOARD
    public function updateBoard($post = [])
    {
        if (is_object($post['board_img']))
        {
            $pathBoard = $post['board_img']->store('board');
            Kit::where("id", "=", $post["id"])->update(["board_img" => $pathBoard]);
        }

         if (is_object($post['terrace_img']))
        {
            $pathTerrace = $post['terrace_img']->store('terrace');
            Kit::where("id", "=", $post["id"])->update(["terrace_img" => $pathTerrace]);
        }

        $Kit = Kit::find($post['id']);
        $board = $Kit->boards()->first();

        $board->type = $post['type'];
        $board->price = $post['price'];
        $board->name = $post['name'];
        $board->brand =  $post['brand'];
        $board->width = $post['width'];
        $board->height = $post['height'];
        $board->thickness = $post['thickness'];

        $board->save();
    }

    //EDIT ONE BOARDS
    public function updateBoards($post = [])
    {
        if (is_object($post['board_img']))
        {
            $pathBoard = $post['board_img']->store('board');
            Kit::where("id", "=", $post["id"])->update(["board_img" => $pathBoard]);
        }

         if (is_object($post['terrace_img']))
        {
            $pathTerrace = $post['terrace_img']->store('terrace');
            Kit::where("id", "=", $post["id"])->update(["terrace_img" => $pathTerrace]);
        }

        $Kit = Kit::find($post['id']);

        $i = 0;
        foreach ($Kit->boards as $board) {
            if($i == 0)
            {
                $board->type = $post['type'];
                $board->price = $post['price'];
                $board->name = $post['name'];
                $board->brand =  $post['brand'];
                $board->width = $post['width'];
                $board->height = $post['height'];
                $board->thickness = $post['thickness'];

                $board->save();
            }
            else
            {
                $board->type = $post['typeSecond'];
                $board->price = $post['priceSecond'];
                $board->name = $post['nameSecond'];
                $board->brand =  $post['brandSecond'];
                $board->width = $post['widthSecond'];
                $board->height = $post['heightSecond'];
                $board->thickness = $post['thicknessSecond'];

                $board->save();
            }

            $i++;
        }
    }

    //REMOVE

    public function remove($post = [])
    {
        $Kit = Kit::find($post['id']);
        //$kit->boards()->detach(boards());
        $Kit->boards()->delete();
        Kit::where("id", "=", $post["id"])->delete();
    }
}
