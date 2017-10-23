<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        return Item::all();
    }

    public function show(Item $item)
    {
        return $item;
    }

    public function store(Request $request)
    {
        $item = Item::create($request->all());

        return response()->json($item, 201);
    }

    public function update(Request $request, Item $item)
    {
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete(Request $request, Item $item)
    {
        $item->delete();

        return response()->json(null, 204);
    }
}