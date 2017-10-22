<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OrderItem;

class OrderItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        return OrderItem::all();
    }

    public function show(OrderItem $orderItem)
    {
        return $orderItem;
    }

    public function store(Request $request)
    {
        $orderItem = OrderItem::create($request->all());

        return response()->json($orderItem, 201);
    }

    public function update(Request $request, OrderItem $orderItem)
    {
        $orderItem->update($request->all());

        return response()->json($orderItem, 200);
    }

    public function delete(Request $request, OrderItem $orderItem)
    {
        $orderItem->delete();

        return response()->json(null, 204);
    }
}