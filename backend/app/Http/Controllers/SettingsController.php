<?php

namespace App\Http\Controllers;

use App\Models\PgRating;

class SettingsController
{
    /**
     * Return all settings
     */
    public function index()
    {
        return [
            'pg_ratings' => PgRating::all(),
        ];
    }
}
