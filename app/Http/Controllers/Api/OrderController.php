<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\OrderItem;
use App\LineItem;
use App\Item;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        $orders = Order::all();
        $result = [];
        foreach ($orders as $order) {
            $order->total = $order->total();
            $result[] = $order;
        }
        return response()->json($result, 200);
    }

    public function show(Order $order)
    {
        return $order;
    }

    public function store(Request $request)
    {
        $order = Order::create($request->all());

        return response()->json($order, 201);
    }

    public function update(Request $request, Order $order)
    {
        $order->update($request->all());

        return response()->json($order, 200);
    }

    public function delete(Request $request, Order $order)
    {
        $order->delete();

        return response()->json(null, 204);
    }

    public function add(Request $request)
    {
        $status = $request->input('status');
        $itemID = $request->input('item');
        $quantity = $request->input('quantity');
        $notes = $request->input('notes');


        $line_item = new LineItem();
        $line_item->entry_type = "Credit";
        $line_item->amount = 0;
        $line_item->label = "Sale";
        $line_item->save();

        $order = new Order();
        $order->user_id = \Auth::user()->id;
        $order->status = $status;
        $order->line_item_id = $line_item->id;
        $order->save();

        $orderItem = new OrderItem();
        $orderItem->order_id = $order->id;
        $orderItem->item_id = $itemID;
        $orderItem->quantity = $quantity;
        $orderItem->notes = $notes ?? "";
        $orderItem->save();

        $item = Item::find($itemID);
        $total = $item->cost * $quantity;

        $line_item->amount = $total;
        $line_item->save();

        return response()->json($order, 200);
    }

    public function edit(Request $request)
    {
        $orderID = $request->input('order_id');
        $status = $request->input('status');
        $itemID = $request->input('item');
        $quantity = $request->input('quantity');
        $notes = $request->input('notes');


        // $line_item = new App\LineItem();
        // $line_item->entry_type = "Credit";
        // $line_item->amount = 0;
        // $line_item->label = "Sale";
        // $line_item->save();

        $order = Order::find($orderID);
        // $order->user_id = \Auth::user()->id;
        if ($status) {
            $order->status = $status;
        }
        // $order->line_item_id = $line_item->id;
        $order->save();

        $orderItem = new OrderItem();
        $orderItem->order_id = $order->id;
        if ($notes) {
            $orderItem->item_id = $notes;
        }
        if ($itemID) {
            $orderItem->item_id = $itemID;
        }
        if ($quantity) {
            $orderItem->quantity = $quantity;
        }
        $orderItem->save();

        $item = Item::find($itemID);
        $total = $item->cost * $orderItem->quantity;

        $line_item = LineItem::find($order->line_item_id);
        $line_item->amount = $total;
        $line_item->save();

        return response()->json($order, 200);
    }
}