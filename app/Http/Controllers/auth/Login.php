<?php
namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class Login extends Controller
{
  public function index()
  {
    $pageConfigs = ['myLayout' => 'blank'];
    return view('content.authentications.login', ['pageConfigs' => $pageConfigs]);
  }
}
