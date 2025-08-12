<?php
namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Login extends Controller
{
  public function index()
  {
    $pageConfigs = ['myLayout' => 'blank'];
    return view('content.authentications.login', ['pageConfigs' => $pageConfigs]);
  }

  public function postLogin(Request $request)
  {
    //Authentification is user and password are correct or not
    if (Auth::attempt($request->only('username', 'password'))) {
      $request->session()->regenerate();
      $username = Auth::User()->username;
      $comp_name = Auth::User()->comp_name;
      $comp_code = Auth::User()->comp_code;
      $request->session()->put('comp_name', $comp_name);
      $request->session()->put('username', $username);
      $request->session()->put('comp_code', $comp_code);

      $current_date_time = Carbon::now()->toDateTimeString();
      DB::table('userlog')->insert([
        'username' => Auth::user()->name,
        'tbl' => 'ONLINE',
        'idtbl' => '0',
        'notbl' => '',
        'act' => 'LOGIN',
        'comp_code' => $comp_code,
        'usin' => 1,
        'datein' => $current_date_time,
      ]);

      return redirect()->intended('/pemasukan-dokumen');
    }
    return redirect('/');
  }

  public function logout(request $request)
  {
    Auth::logout();
    $current_date_time = Carbon::now()->toDateTimeString();
    DB::table('userlog')->insert([
      'username' => session()->get('username'),
      'tbl' => 'ONLINE',
      'idtbl' => '0',
      'notbl' => '',
      'act' => 'LOGOUT',
      'comp_code' => session()->get('comp_code'),
      'usin' => 1,
      'datein' => $current_date_time,
    ]);

    return redirect('/');
  }
}
