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
       	$kit->board_img = '/storage/imgages/board-k-SZARA.jpg';
       	$kit->terrace_img = '/storage/imgages/ter-com-1.jpg';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/imgages/board-k-TAUPE.jpg';
       	$kit->terrace_img = '/storage/imgages/ter-com-2.jpg';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/imgages/board-k-CHOCOLATE.jpg';
       	$kit->terrace_img = '/storage/imgages/ter-com-3.jpg';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/imgages/board-k-BRĄZOWA.jpg';
       	$kit->terrace_img = '/storage/imgages/ter-com-4.jpg';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/imgages/board-drew-1.jpg';
       	$kit->terrace_img = '/storage/imgages/t-1.png';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/imgages/board-drew-3.jpg';
       	$kit->terrace_img = '/storage/imgages/t-3.png';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/imgages/board-drew-3.jpg';
       	$kit->terrace_img = '/storage/imgages/t-3.png';
       	$kit->save();

       	$kit = new Kit;
       	$kit->board_img = '/storage/imgages/board-drew-4.jpg';
       	$kit->terrace_img = '/storage/imgages/t-4.png';
       	$kit->save();
    }
}
