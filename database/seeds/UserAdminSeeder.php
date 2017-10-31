<?php

use Illuminate\Database\Seeder;
use App\User;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        $user = new User;
        $user->name = 'admin';
        $user->email = 'admin@admin.ru';
        $user->password = bcrypt('123456789');
        $user->save();
    }
}
