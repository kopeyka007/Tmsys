<?php

use Illuminate\Database\Seeder;
use App\Board;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	Board::truncate();

       	$board = new Board;
       	$board->type = 'kompozyt';
       	$board->price = 84.73;
       	$board->name = 'DESKA TARASOWA BLOOMA';
       	$board->unit = 'MM';
       	$board->brand = 'SZARA';
       	$board->width = 127;
       	$board->height = 2400;
       	$board->thickness = 22;
       	$board->save();

       	$board = new Board;
       	$board->type = 'kompozyt';
       	$board->price = 57.42;
       	$board->name = 'DESKA TARASOWA BLOOMA';
       	$board->unit = 'MM';
       	$board->brand = 'TAUPE';
       	$board->width = 127;
       	$board->height = 3000;
       	$board->thickness = 22;
       	$board->save();

       	$board = new Board;
       	$board->type = 'kompozyt';
       	$board->price = 35.73;
       	$board->name = 'DESKA TARASOWA BLOOMA';
       	$board->unit = 'MM';
       	$board->brand = 'CHOCOLATE';
       	$board->width = 145;
       	$board->height = 2000;
       	$board->thickness = 21;
       	$board->save();

       	$board = new Board;
       	$board->type = 'kompozyt';
       	$board->price = 84.73;
       	$board->name = 'DESKA TARASOWA BLOOMA';
       	$board->unit = 'MM';
       	$board->brand = 'BRĄZOWA';
       	$board->width = 127;
       	$board->height = 2400;
       	$board->thickness = 22;
       	$board->save();

       	$board = new Board;
       	$board->type = 'drevniana';
       	$board->price = 29.96;
       	$board->name = 'DESKA TARASOWA BLOOMA ŚWIERK';
       	$board->unit = 'MM';
       	$board->brand = 'BRĄZOWA';
       	$board->width = 144;
       	$board->height = 2400;
       	$board->thickness = 27;
       	$board->save();

       	$board = new Board;
       	$board->type = 'drevniana';
       	$board->price = 19.96;
       	$board->name = 'DESKA TARASOWA BLOOMA ŚWIERK';
       	$board->unit = 'MM';
       	$board->brand = 'BRĄZOWA';
       	$board->width = 144;
       	$board->height = 1200;
       	$board->thickness = 27;
       	$board->save();

       	$board = new Board;
       	$board->type = 'drevniana';
       	$board->price = 29.96;
       	$board->name = 'DESKA TARASOWA BLOOMA MODRZEW EUROPEJSKI';
       	$board->unit = 'MM';
       	$board->brand = 'BRĄZOWA';
       	$board->width = 140;
       	$board->height = 2500;
       	$board->thickness = 24;
       	$board->save();

       	$board = new Board;
       	$board->type = 'drevniana';
       	$board->price = 9.98;
       	$board->name = 'DESKA TARASOWA BLOOMA SOSNA';
       	$board->unit = 'MM';
       	$board->brand = 'ZIELONA';
       	$board->width = 95;
       	$board->height = 2400;
       	$board->thickness = 24;
       	$board->save();

       	$board = new Board;
       	$board->type = 'drevniana';
       	$board->price = 48.94;
       	$board->name = 'DESKA TARASOWA DREWNIANA BLOOMA';
       	$board->unit = 'MM';
       	$board->brand = 'ŚWIERK';
       	$board->width = 144;
       	$board->height = 3600;
       	$board->thickness = 27;
       	$board->save();

       	$board = new Board;
       	$board->type = 'drevniana';
       	$board->price = 38.94;
       	$board->name = 'DESKA TARASOWA DREWNIANA BLOOMA';
       	$board->unit = 'MM';
       	$board->brand = 'ŚWIERK';
       	$board->width = 144;
       	$board->height = 2400;
       	$board->thickness = 27;
       	$board->save();
    }
}
