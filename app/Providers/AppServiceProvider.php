<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use PDO;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    //
    // Ensure decimals are returned as strings
    DB::connection()
      ->getPdo()
      ->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, true);
  }
}
