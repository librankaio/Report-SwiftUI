<?php

namespace App\Http\Controllers\pemasukan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Pemasukan extends Controller
{
  public function index()
  {
    return view('content.pemasukan-dokumen.pemasukan');
  }
}
