<?php

namespace App\Http\Controllers\mutasi;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MutasiMesin extends Controller
{
  public function index()
  {
    return view('content.mutasi.mutasi-mesin');
  }
  public function getMutasiMesin(Request $request)
  {
    $datefrForm = $request->input('tanggal_dari');
    $datetoForm = $request->input('tanggal_sampai');
    $compcode = session()->get('comp_code');

    $results = DB::select('CALL rptmutasimesin(?, ?, ?)', [$datefrForm, $datetoForm, $compcode]);

    // Return hasil dalam bentuk JSON array untuk DataTables
    return response()->json([
      'data' => $results,
    ]);
  }
}
