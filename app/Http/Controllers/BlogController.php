<?php

namespace App\Http\Controllers;

use App\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    public function __construct()
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $allPost = Blog::all();
        $ret = [];
        foreach ($allPost as $post) {
            $ret[] = $post->cast();
        }
        return response()->json($ret, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $ret = Blog::create($request->only('title', 'content'));
        return response()->json($ret, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $post = Blog::where("_id", $id)->first();

        return response()->json($post->cast(), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Blog::where("_id", $id)->first();
        $data = $request->only('title', 'content');
        $post->title = $data['title'];
        $post->content = $data['content'];
        $post->save();
        return response()->json($post->cast(), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $ret = Blog::destroy($id);
        return response()->json($ret, 201);
    }

}
