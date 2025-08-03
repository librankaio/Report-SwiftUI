<?php
namespace App\Http\Controllers\mutasi;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class MutasiBj extends Controller
{
  public function index()
  {
    return view('content.mutasi.mutasi-bj');
  }
}
