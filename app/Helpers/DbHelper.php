<?php

namespace App\Helpers;

class DbHelper
{
  /**
   * Normalisasi hasil DB::select agar string numeric dengan koma jadi float.
   *
   * @param array $results
   * @return array
   */
  // DAFTARKAN DI COMPOSER.json
  //   "autoload": {
  //   "files": [
  //     "app/Helpers/DbHelper.php"
  //   ]
  // }
  public static function normalizeNumericResults(array $results): array
  {
    foreach ($results as &$row) {
      foreach ($row as $key => $val) {
        if (is_string($val) && str_contains($val, ',')) {
          $row->$key = floatval(str_replace(',', '.', $val));
        }
      }
    }
    unset($row);

    return $results;
  }
}
