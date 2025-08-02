<?php

namespace Database\Factories;

use App\Models\PgRating;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pgRatingId = PgRating::inRandomOrder()->first()->id ?? 1; // Fallback to 1 if no ratings exist

        return [
            'title' => $this->faker->unique()->sentence(rand(1, 3)),
            'description' => $this->faker->paragraph(rand(1, 3)),
            'pg_rating_id' => $pgRatingId,
        ];
    }
}
