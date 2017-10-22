<?php

use Illuminate\Database\Seeder;
use App\Kit;

class KitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Kit::truncate();

        $kit = new Kit;
       	$kit->board_img = '/storage/images/board-k-SZARA.jpg';
       	$kit->terrace_img = '/storage/images/ter-com-1.jpg';
        $kit->type_board = 'composite';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/images/board-k-TAUPE.jpg';
       	$kit->terrace_img = '/storage/images/ter-com-2.jpg';
        $kit->type_board = 'composite';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/images/board-k-CHOCOLATE.jpg';
       	$kit->terrace_img = '/storage/images/ter-com-3.jpg';
        $kit->type_board = 'composite';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/images/board-k-BRĄZOWA.jpg';
       	$kit->terrace_img = '/storage/images/ter-com-4.jpg';
        $kit->type_board = 'composite';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/images/board-drew-1.jpg';
       	$kit->terrace_img = '/storage/images/t-1.png';
        $kit->type_board = 'wooden';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/images/board-drew-2.jpg';
       	$kit->terrace_img = '/storage/images/t-2.png';
        $kit->type_board = 'wooden';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/images/board-drew-3.jpg';
       	$kit->terrace_img = '/storage/images/t-3.png';
        $kit->type_board = 'wooden';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/images/board-drew-4.jpg';
       	$kit->terrace_img = '/storage/images/t-4.png';
        $kit->type_board = 'wooden';
       	$kit->save();
    }
}
