<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\LineItem;

class LineItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        return LineItem::all();
    }

    public function show(LineItem $lineItem)
    {
        return $lineItem;
    }

    public function store(Request $request)
    {
        $lineItem = LineItem::create($request->all());

        return response()->json($lineItem, 201);
    }

    public function update(Request $request, LineItem $lineItem)
    {
        $lineItem->update($request->all());

        return response()->json($lineItem, 200);
    }

    public function delete(Request $request, LineItem $lineItem)
    {
        $lineItem->delete();

        return response()->json(null, 204);
    }
}