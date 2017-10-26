<?php

use Illuminate\Database\Seeder;
use App\BoardKit;

class BoardKitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BoardKit::truncate();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 1;
       	$boardkit->kit_id = 1;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 2;
       	$boardkit->kit_id = 2;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 3;
       	$boardkit->kit_id = 3;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 4;
       	$boardkit->kit_id = 4;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 5;
       	$boardkit->kit_id = 5;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 6;
       	$boardkit->kit_id = 5;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 7;
       	$boardkit->kit_id = 6;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 8;
       	$boardkit->kit_id = 7;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 9;
       	$boardkit->kit_id = 8;
       	$boardkit->save();

       	$boardkit = new BoardKit;
       	$boardkit->board_id = 10;
       	$boardkit->kit_id = 8;
       	$boardkit->save();
    }
}
