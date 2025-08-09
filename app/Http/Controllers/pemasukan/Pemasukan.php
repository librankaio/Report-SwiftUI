<?php

namespace App\Http\Controllers\pemasukan;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Pemasukan extends Controller
{
  public function index()
  {
    return view('content.pemasukan-dokumen.pemasukan');
  }

  public function getPemasukan(Request $request)
  {
    // Get parameters if needed
    $datefrForm = $request->input('dari');
    $datetoForm = $request->input('sampai');
    $jenisdok = $request->input('jenisdok');
    // dd($request->all());
    if ($jenisdok != 'All') {
      $results = DB::table('pemasukan_dokumen')
        ->whereBetween('dptanggal', [$datefrForm, $datetoForm])
        ->where('stat', '=', 1)
        ->where('jenis_dokumen', '=', $jenisdok)
        ->orderByDesc('dptanggal')
        ->orderByDesc('dpnomor')
        ->get();

      return response()->json([
        'data' => $results,
      ]);
    } elseif ($jenisdok == 'All') {
      $results = DB::table('pemasukan_dokumen')
        ->whereBetween('dptanggal', [$datefrForm, $datetoForm])
        ->where('stat', '=', 1)
        ->orderByDesc('dptanggal')
        ->orderByDesc('dpnomor')
        ->get();
      return response()->json([
        'data' => $results,
      ]);
    }
  }
}
