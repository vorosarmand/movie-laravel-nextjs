<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('movies')->group(function () {
    Route::post('/', [MovieController::class, 'store']);
    Route::get('/', [MovieController::class, 'index']);
    Route::get('/{id}', [MovieController::class, 'show']);
    Route::put('/{id}', [MovieController::class, 'update']);
    Route::delete('/{id}', [MovieController::class, 'destroy']);
});

Route::get('/settings', [SettingsController::class, 'index']);


