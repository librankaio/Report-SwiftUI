@extends('layouts/layoutMaster')

@section('title', 'Mutasi Barang Jadi')

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
    <script src="{{ asset('assets/js/tables-customs.js') }}"></script>
@endsection

@section('content')
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">Report /</span> Mutasi Barang Jadi
    </h4>
    <div class="row">
        <!-- Form controls -->
        <div class="col-md-6">
            <div class="card mb-4">
                <h5 class="card-header">Input Data</h5>
                <div class="card-body demo-vertical-spacing demo-only-element">
                    <div class="form-floating form-floating-outline mb-4">
                        <input class="form-control" type="date" id="html5-date-input" value="{{ date('Y-m-d') }}" />
                        <label for="html5-date-input">Tanggal Dari</label>
                    </div>
                    <div class="form-floating form-floating-outline mb-4">
                        <input class="form-control" type="date" id="html5-date-input" value="{{ date('Y-m-d') }}" />
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
                        <th></th>
                        <th></th>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <!-- Modal to add new record -->
    {{-- <div class="offcanvas offcanvas-end" id="add-new-record">
        <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title" id="exampleModalLabel">New Record</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body flex-grow-1">
            <form class="add-new-record pt-0 row g-3" id="form-add-new-record" onsubmit="return false">
                <div class="col-sm-12">
                    <div class="input-group input-group-merge">
                        <span id="basicFullname2" class="input-group-text"><i class="mdi mdi-account-outline"></i></span>
                        <div class="form-floating form-floating-outline">
                            <input type="text" id="basicFullname" class="form-control dt-full-name" name="basicFullname"
                                placeholder="John Doe" aria-label="John Doe" aria-describedby="basicFullname2" />
                            <label for="basicFullname">Full Name</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="input-group input-group-merge">
                        <span id="basicPost2" class="input-group-text"><i class='mdi mdi-briefcase-outline'></i></span>
                        <div class="form-floating form-floating-outline">
                            <input type="text" id="basicPost" name="basicPost" class="form-control dt-post"
                                placeholder="Web Developer" aria-label="Web Developer" aria-describedby="basicPost2" />
                            <label for="basicPost">Post</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="input-group input-group-merge">
                        <span class="input-group-text"><i class="mdi mdi-email-outline"></i></span>
                        <div class="form-floating form-floating-outline">
                            <input type="text" id="basicEmail" name="basicEmail" class="form-control dt-email"
                                placeholder="john.doe@example.com" aria-label="john.doe@example.com" />
                            <label for="basicEmail">Email</label>
                        </div>
                    </div>
                    <div class="form-text">
                        You can use letters, numbers & periods
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="input-group input-group-merge">
                        <span id="basicDate2" class="input-group-text"><i
                                class='mdi mdi-calendar-month-outline'></i></span>
                        <div class="form-floating form-floating-outline">
                            <input type="text" class="form-control dt-date" id="basicDate" name="basicDate"
                                aria-describedby="basicDate2" placeholder="MM/DD/YYYY" aria-label="MM/DD/YYYY" />
                            <label for="basicDate">Joining Date</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="input-group input-group-merge">
                        <span id="basicSalary2" class="input-group-text"><i class='mdi mdi-currency-usd'></i></span>
                        <div class="form-floating form-floating-outline">
                            <input type="number" id="basicSalary" name="basicSalary" class="form-control dt-salary"
                                placeholder="12000" aria-label="12000" aria-describedby="basicSalary2" />
                            <label for="basicSalary">Salary</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <button type="submit" class="btn btn-primary data-submit me-sm-3 me-1">Submit</button>
                    <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                </div>
            </form>

        </div>
    </div> --}}
    <!--/ DataTable with Buttons -->
@endsection
