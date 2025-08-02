<?php

namespace Database\Seeders;

use App\Models\PgRating;
use Illuminate\Database\Seeder;

class PgRatingSeeder extends Seeder
{
    public function run()
    {
        PgRating::create([
            'name' => 'G',
        ]);
        PgRating::create([
            'name' => 'PG',
        ]);
        PgRating::create([
            'name' => 'PG-13',
        ]);
        PgRating::create([
            'name' => 'R',
        ]);
    }
}
