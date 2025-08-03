<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MovieController
{
    /**
     * Display a listing of the resource, apply filtering and sorting.
     */
    public function index()
    {

        return QueryBuilder::for(Movie::class)->with('pgRating')
            ->allowedFilters(['title', AllowedFilter::exact('pg_rating_id')])
            ->allowedSorts(['id', 'title', 'description', 'pg_rating_id'])
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'pg_rating_id' => 'required|exists:pg_ratings,id',
        ]);

        $movie = Movie::create($request->all())->load('pgRating');

        return response()->json($movie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $movie = Movie::with('pgRating')->find($id);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }
        return $movie;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                'title' => 'string|max:255',
                'description' => 'string',
                'pg_rating_id' => 'exists:pg_ratings,id',
            ]
        );

        Movie::find($id)->update($request->all());
        $movie = Movie::find($id)->load('pgRating');

        return response()->json($movie, 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): void
    {
        Movie::destroy($id);
    }
}
