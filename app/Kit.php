<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kit extends Model
{

    public function boards()
    {
        return $this->belongsToMany('App\Board', 'board_kits', 'kit_id', 'board_id');
    }
}
