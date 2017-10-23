<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Setting;

class SettingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        return Setting::all();
    }

    public function show(Setting $setting)
    {
        return $setting;
    }

    public function store(Request $request)
    {
        $setting = Setting::create($request->all());

        return response()->json($setting, 201);
    }

    public function update(Request $request, Setting $setting)
    {
        $setting->update($request->all());

        return response()->json($setting, 200);
    }

    public function delete(Request $request, Setting $setting)
    {
        $setting->delete();

        return response()->json(null, 204);
    }
}