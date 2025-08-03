@php
    $configData = Helper::appClasses();
    $customizerHidden = 'customizer-hide';
@endphp

@extends('layouts/layoutMaster')

@section('title', 'Login')

@section('vendor-style')
    <!-- Vendor -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/@form-validation/umd/styles/index.min.css') }}" />
@endsection

@section('page-style')
    <!-- Page -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/pages/page-auth.css') }}">
@endsection

@section('vendor-script')
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/bundle/popular.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/plugin-bootstrap5/index.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/plugin-auto-focus/index.min.js') }}"></script>
@endsection

@section('page-script')
    <script src="{{ asset('assets/js/pages-auth.js') }}"></script>
@endsection

@section('content')
    <div class="position-relative"
        style="background-image: url('{{ asset('assets/img/logo/wallpaper login 1wallpaper-backgorund-normal.png') }}');">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner py-4">

                <!-- Login -->
                <div class="card p-2">
                    <!-- Logo -->
                    <div class="app-brand justify-content-center mt-5">
                        <img src="{{ asset('assets/img/logo/logo-swifect-logo.png') }}" alt="logo"></img>
                        {{-- <a href="{{ url('/') }}" class="app-brand-link gap-2">
                            <span class="app-brand-logo demo">@include('_partials.macros', ['width' => 25, 'withbg' => 'var(--bs-primary)'])</span>
                            <span
                                class="app-brand-text demo text-heading fw-bold">{{ config('variables.templateName') }}</span>
                        </a> --}}
                    </div>
                    <div class="app-brand justify-content-center mt-3">
                        <h4 class="mb-2">IT INVENTORY ONLINE BC</h4>
                    </div>
                    <!-- /Logo -->
                    <div class="card-body mt-2">
                        <form id="formAuthentication" class="mb-3" action="{{ url('/') }}" method="GET">
                            <div class="form-floating form-floating-outline mb-3">
                                <input type="text" class="form-control" id="username" name="username"
                                    placeholder="Enter your username" autofocus>
                                <label for="username">Username</label>
                            </div>
                            <div class="mb-3">
                                <div class="form-password-toggle">
                                    <div class="input-group input-group-merge">
                                        <div class="form-floating form-floating-outline">
                                            <input type="password" id="password" class="form-control" name="password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password" />
                                            <label for="password">Password</label>
                                        </div>
                                        <span class="input-group-text cursor-pointer"><i
                                                class="mdi mdi-eye-off-outline"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                            </div>
                        </form>
                        <hr>
                        <div class="d-flex justify-content-center gap-2">
                            <a href="https://swifect.com/" target="_blank">PT.Swifect Solusi Indonesia
                                <script>
                                    document.write(new Date().getFullYear());
                                </script> ©
                            </a>
                        </div>
                        <div class="d-flex justify-content-center gap-2">
                            Go to Swifect Repository page click <a href="https://repository.swiapps.com/"
                                target="_blank">Here</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Login -->
            <img alt="mask"
                src="{{ asset('assets/img/illustrations/auth-basic-login-mask-' . $configData['style'] . '.png') }}"
                class="authentication-image d-none d-lg-block"
                data-app-light-img="illustrations/auth-basic-login-mask-light.png"
                data-app-dark-img="illustrations/auth-basic-login-mask-dark.png" />
        </div>
    </div>
    </div>
@endsection
