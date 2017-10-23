<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Expense;

class ExpenseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        return Expense::all();
    }

    public function show(Expense $expense)
    {
        return $expense;
    }

    public function store(Request $request)
    {
        $expense = Expense::create($request->all());

        return response()->json($expense, 201);
    }

    public function update(Request $request, Expense $expense)
    {
        $expense->update($request->all());

        return response()->json($expense, 200);
    }

    public function delete(Request $request, Expense $expense)
    {
        $expense->delete();

        return response()->json(null, 204);
    }
}