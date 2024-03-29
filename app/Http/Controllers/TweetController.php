<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Tweet;
use Auth;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tweets = Tweet::with([
            'user' => fn ($q) => $q->withCount([
                'followers as isFollowing' => fn ($q) => $q
                    ->where('follower_id', auth()->user()->id)
            ])
                ->withCasts(['isFollowing' => 'boolean'])
        ])->latest()->get();

        return Inertia::render('Tweets/Index', compact('tweets'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tweets/Create',);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => ['required', 'string', 'min:3', 'max:280'],
            'user_id' => ['exists:users,id']
        ]);
        Tweet::create($request->only('content'));

        return to_route('tweet.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tweet $tweet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tweet $tweet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tweet $tweet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tweet $tweet)
    {
        //
    }

    public function follows(Request $request, User $user)
    {
        Auth::user()->followings()->attach($user->id);

        return to_route('tweet.index');
    }

    public function unfollows(Request $request, User $user)
    {
        Auth::user()->followings()->detach($user->id);

        return back();
    }

    public function followings(Request $request,)
    {
        $followings = Tweet::with('user')
        ->whereIn('user_id', auth()->user()->followings->pluck('id'))
        ->orderBy('created_at', 'DESC')
        ->with([
            'user' => fn ($q) => $q->withCount([
            'followings as isFollowingUser' => fn ($q) => $q
                ->where('following_id', '=', auth()->user()->id)])
                ->withCasts(['isFollowingUser' => 'boolean'])
        ])->get();

        return Inertia::render('Tweets/Followings', [
            'followings' => $followings
        ]);

    }
}
