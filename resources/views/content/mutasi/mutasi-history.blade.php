@extends('layouts/layoutMaster')

@section('title', 'Mutasi Log History')

@section('vendor-style')
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
        const mutasiLogHistUrl = "{{ route('mutasiloghistdata') }}";
    </script>
    <script type="module" src="{{ asset('assets/js/page-mutasiloghist.js') }}"></script>
@endsection

@section('content')
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">Report /</span> Mutasi Log History
    </h4>
    <div class="row">
        <!-- Form controls -->
        <div class="col-md-6">
            <div class="card mb-4">
                <h5 class="card-header">Input Data</h5>
                <div class="card-body demo-vertical-spacing demo-only-element">
                    <div class="form-floating form-floating-outline mb-4">
                        <input class="form-control" type="date" id="tanggal_dari" value="{{ date('Y-m-d') }}" />
                        <label for="html5-date-input">Tanggal Dari</label>
                    </div>
                    <div class="form-floating form-floating-outline mb-4">
                        <input class="form-control" type="date" id="tanggal_sampai" value="{{ date('Y-m-d') }}" />
                        <label for="html5-date-input">Sampai Tanggal</label>
                    </div>
                    <button type="button" class="btn btn-primary">View</button>
                </div>
            </div>
        </div>
    </div>

    <!-- DataTable with Buttons -->
    <div class="card">
        <div class="card-datatable table-responsive pt-0">
            <table class="datatables-basic table table-bordered">
                <thead>
                    <tr>
                        <th>Nama User</th>
                        <th>Jenis Transaksi</th>
                        <th>Action</th>
                        <th>Tanggal/Waktu</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
@endsection
