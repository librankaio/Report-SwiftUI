<?php

namespace App\Http\Controllers\pengeluaran;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Pengeluaran extends Controller
{
  public function index()
  {
    return view('content.pengeluaran-dokumen.pengeluaran');
  }

  public function getPengeluaran(Request $request)
  {
    // Get parameters
    $datefrForm = $request->input('dari');
    $datetoForm = $request->input('sampai');
    $jenisdok = $request->input('jenisdok');
    $jenisPencarian = $request->input('jenis_pencarian'); // e.g. "No Pendaftaran"
    $nilaiPencarian = $request->input('nilai_pencarian'); // user input for the search

    // Base query
    $query = DB::table('pengeluaran_dokumen')
      ->whereBetween('dptanggal', [$datefrForm, $datetoForm])
      ->where('stat', '=', 1);

    // Jenis dokumen filter
    if ($jenisdok != 'All') {
      $query->where('jenis_dokumen', '=', $jenisdok);
    }

    // Jenis pencarian filter
    if ($jenisPencarian && $nilaiPencarian) {
      switch ($jenisPencarian) {
        case 'No Pendaftaran':
          $query->where('no_pendaftaran', 'like', "%{$nilaiPencarian}%");
          break;
        case 'No Bukti Penerimaan':
          $query->where('no_bukti_penerimaan', 'like', "%{$nilaiPencarian}%");
          break;
        case 'Supplier':
          $query->where('supplier', 'like', "%{$nilaiPencarian}%");
          break;
        case 'Kode Barang':
          $query->where('kode_barang', 'like', "%{$nilaiPencarian}%");
          break;
        case 'Nama Barang':
          $query->where('nama_barang', 'like', "%{$nilaiPencarian}%");
          break;
      }
    }
    // Order & get results
    $results = $query
      ->orderByDesc('dptanggal')
      ->orderByDesc('dpnomor')
      ->get();
    return response()->json([
      'data' => $results,
    ]);
  }
}
