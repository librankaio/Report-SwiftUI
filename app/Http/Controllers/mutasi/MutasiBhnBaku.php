<?php

namespace App\Http\Controllers\mutasi;

use App\Helpers\DbHelper;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDO;

class MutasiBhnBaku extends Controller
{
  public function index()
  {
    return view('content.mutasi.mutasi-bhnbaku');
  }

  public function getMutasibhnbaku(Request $request)
  {
    $datefrForm = $request->input('dari');
    $datetoForm = $request->input('sampai');
    $compcode = session()->get('comp_code');

    $results = DB::select('CALL rptmutasibahanbaku(?, ?, ?)', [$datefrForm, $datetoForm, $compcode]);

    // Return hasil dalam bentuk JSON array untuk DataTables
    return response()->json([
      'data' => $results,
    ]);
  }
}
