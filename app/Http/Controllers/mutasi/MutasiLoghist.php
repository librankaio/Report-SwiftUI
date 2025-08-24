<?php

namespace App\Http\Controllers\mutasi;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MutasiLoghist extends Controller
{
  public function index()
  {
    return view('content.mutasi.mutasi-history');
  }

  public function getLogHistory(Request $request)
  {
    $datefrForm = $request->input('dari');
    $datetoForm = $request->input('sampai');
    $compcode = session()->get('comp_code');

    $results = DB::select(
      "SELECT * FROM userlog WHERE comp_code = '$compcode' and DATE(datein) >= '" .
        $datefrForm .
        "' and DATE(datein) <= '" .
        $datetoForm .
        "'"
    );

    // Return hasil dalam bentuk JSON array untuk DataTables
    return response()->json([
      'data' => $results,
    ]);
  }
}
