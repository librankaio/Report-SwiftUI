<?php

namespace App\Http\Controllers\pengeluaran;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Pengeluaran extends Controller
{
  public function index()
  {
    return view('content.pengeluaran-dokumen.pengeluaran');
  }
}
