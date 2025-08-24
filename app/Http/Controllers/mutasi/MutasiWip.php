<?php

namespace App\Http\Controllers\mutasi;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MutasiWip extends Controller
{
  public function index()
  {
    return view('content.mutasi.mutasi-wip');
  }
  public function getMutasiWip(Request $request)
  {
    $datefrForm = $request->input('dari');
    $datetoForm = $request->input('sampai');
    $compcode = session()->get('comp_code');

    $results = DB::select('CALL rptmutasiwip(?, ?, ?)', [$datefrForm, $datetoForm, $compcode]);

    // Return hasil dalam bentuk JSON array untuk DataTables
    return response()->json([
      'data' => $results,
    ]);
  }
}
