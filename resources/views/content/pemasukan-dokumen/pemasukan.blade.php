@extends('layouts/layoutMaster')

@section('title', 'Pemasukan Dokumen')

@section('vendor-style')
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/spinkit/spinkit.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/flatpickr/flatpickr.css') }}" />
    <!-- Row Group CSS -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-rowgroup-bs5/rowgroup.bootstrap5.css') }}">
    <!-- Form Validation -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/@form-validation/umd/styles/index.min.css') }}" />
@endsection

@section('vendor-script')
    <script src="{{ asset('assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js') }}"></script>
    {{-- baru --}}
    {{-- end baru --}}
    <!-- Flat Picker -->
    <script src="{{ asset('assets/vendor/libs/moment/moment.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/flatpickr/flatpickr.js') }}"></script>
    <!-- Form Validation -->
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/bundle/popular.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/plugin-bootstrap5/index.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/plugin-auto-focus/index.min.js') }}"></script>
@endsection

@section('page-script')
    <script>
        const pemasukanUrl = "{{ route('pemasukandata') }}";
        const pemasukanExcelUrl = "{{ route('exportexcelpemasukan') }}";
    </script>
    <script type="module" src="{{ asset('assets/js/page-pemasukan.js') }}"></script>
@endsection

@section('content')
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">Report /</span> Pemasukan Dokumen
    </h4>
    <div class="row">
        <!-- Form controls -->
        <div class="col-md-6">
            <div class="card mb-4">
                <h5 class="card-header">Input Data</h5>
                <div class="card-body demo-vertical-spacing demo-only-element">
                    <div class="form-floating form-floating-outline mb-4">
                        <select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
                            <option selected>Pilih Jenis Dokumen</option>
                            <option value='All'>All</option>
                            <option value="BC 2.0">BC 2.0</option>
                            <option value="BC 2.3">BC 2.3</option>
                            <option value="BC 2.6.2">BC 2.6.2</option>
                            <option value="BC 2.7">BC 2.7</option>
                            <option value="BC 4.0">BC 4.0</option>
                            <option value="PPFTZ-02">PPFTZ-02</option>
                        </select>
                        <label for="exampleFormControlSelect1">Jenis Dokumen</label>
                    </div>
                    <div class="form-floating form-floating-outline mb-4">
                        <input class="form-control" type="date" id="tanggal_dari" value="{{ date('Y-m-d') }}" />
                        <label for="tanggal_dari">Tanggal Dari</label>
                    </div>
                    <div class="form-floating form-floating-outline mb-4">
                        <input class="form-control" type="date" id="tanggal_sampai" value="{{ date('Y-m-d') }}" />
                        <label for="tanggal_sampai">Sampai Tanggal</label>
                    </div>
                    <div class="form-floating form-floating-outline mb-4">
                        <select class="form-select" id="jenis_pencarian" aria-label="Default select example">
                            <option selected>Pilih Jenis Pencarian</option>
                            <option value='No Pendaftaran'>No Pendaftaran</option>
                            <option value="No Bukti Penerimaan">No Bukti Penerimaan</option>
                            <option value="Supplier">Supplier</option>
                            <option value="Kode Barang">Kode Barang</option>
                            <option value="Nama Barang">Nama Barang</option>
                        </select>
                        <label for="jenis_pencarian">Jenis Pencarian</label>
                    </div>
                    {{-- <button type="button" class="btn btn-primary">View</button> --}}
                    <div class="d-flex gap-2 mb-3">
                        <button type="button" class="btn btn-primary" id="btn-view">View</button>
                        <div id="export-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- DataTable with Buttons -->
    <div class="card">
        <div class="card-datatable table-responsive pt-0">
            <table id="dokumen-table" class="datatables-basic table table-bordered">
                {{-- <thead>
                    <tr>
                        <th>No</th>
                        <th>Jenis Dokumen</th>
                        <th>Nomor Aju</th>
                        <th>Nomor Dokumen</th>
                        <th>Tanggal Dokumen</th>
                        <th>BPB Nomor</th>
                        <th>BPB Tanggal</th>
                        <th>Pemasok/Pengirim</th>
                        <th>Kode Barang</th>
                        <th>Nama Barang</th>
                        <th>Satuan</th>
                        <th>Jumlah</th>
                        <th>Nilai Barang</th>
                        <th>Nilai USD</th>
                    </tr>
                </thead> --}}
                <thead>
                    <tr>
                        <th rowspan="2" class="text-center">No</th>
                        <th rowspan="2" class="text-center">Jenis Dokumen</th>
                        <th colspan="2" class="text-center">Dokumen Pabean</th>
                        <th colspan="2" class="text-center">Bukti Penerimaan Barang</th>
                        <th rowspan="2" class="text-center">Supplier</th>
                        <th rowspan="2" class="text-center">Kode Barang</th>
                        <th rowspan="2" class="text-center">Nama Barang</th>
                        <th rowspan="2" class="text-center">Satuan</th>
                        <th rowspan="2" class="text-center">Jumlah</th>
                        <th colspan="2" class="text-center">Nilai Barang</th>
                    </tr>
                    <tr>
                        <th>Nomor Pendaftaran</th>
                        <th>Tanggal</th>
                        <th>Nomor</th>
                        <th>Tanggal</th>
                        <th>Rupiah</th>
                        <th>USD</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
@endsection
