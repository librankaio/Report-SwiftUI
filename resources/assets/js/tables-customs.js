/**
 * DataTables Basic
 */
import { numberFormat } from './utils/number-format.js';

('use strict');
console.log(numberFormat(123456.789)); // 123,456.79

let fv, offCanvasEl;
document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    const formAddNewRecord = document.getElementById('form-add-new-record');

    setTimeout(() => {
      const newRecord = document.querySelector('.create-new'),
        offCanvasElement = document.querySelector('#add-new-record');

      // To open offCanvas, to add new record
      if (newRecord) {
        newRecord.addEventListener('click', function () {
          offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
          // Empty fields on offCanvas open
          (offCanvasElement.querySelector('.dt-full-name').value = ''),
            (offCanvasElement.querySelector('.dt-post').value = ''),
            (offCanvasElement.querySelector('.dt-email').value = ''),
            (offCanvasElement.querySelector('.dt-date').value = ''),
            (offCanvasElement.querySelector('.dt-salary').value = '');
          // Open offCanvas with form
          offCanvasEl.show();
        });
      }
    }, 200);

    // Form validation for Add new record
    fv = FormValidation.formValidation(formAddNewRecord, {
      fields: {
        basicFullname: {
          validators: {
            notEmpty: {
              message: 'The name is required'
            }
          }
        },
        basicPost: {
          validators: {
            notEmpty: {
              message: 'Post field is required'
            }
          }
        },
        basicEmail: {
          validators: {
            notEmpty: {
              message: 'The Email is required'
            },
            emailAddress: {
              message: 'The value is not a valid email address'
            }
          }
        },
        basicDate: {
          validators: {
            notEmpty: {
              message: 'Joining Date is required'
            },
            date: {
              format: 'MM/DD/YYYY',
              message: 'The value is not a valid date'
            }
          }
        },
        basicSalary: {
          validators: {
            notEmpty: {
              message: 'Basic Salary is required'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-12'
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      },
      init: instance => {
        instance.on('plugins.message.placed', function (e) {
          if (e.element.parentElement.classList.contains('input-group')) {
            e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
          }
        });
      }
    });

    // FlatPickr Initialization & Validation
    flatpickr(formAddNewRecord.querySelector('[name="basicDate"]'), {
      enableTime: false,
      // See https://flatpickr.js.org/formatting/
      dateFormat: 'm/d/Y',
      // After selecting a date, we need to revalidate the field
      onChange: function () {
        fv.revalidateField('basicDate');
      }
    });
  })();
});

// datatable (jquery)
$(function () {
  var dt_basic_table = $('.datatables-basic'),
    dt_complex_header_table = $('.dt-complex-header'),
    dt_row_grouping_table = $('.dt-row-grouping'),
    dt_multilingual_table = $('.dt-multilingual'),
    dt_basic;

  const $spinner = $('#loading-spinner');
  const $viewBtn = $('.btn.btn-primary');

  // Export buttons config (same as your original)
  const exportButtons = [
    {
      extend: 'collection',
      className: 'btn btn-label-primary dropdown-toggle me-2 waves-effect waves-light',
      text: '<i class="mdi mdi-export-variant me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
      buttons: [
        {
          extend: 'print',
          text: '<i class="mdi mdi-printer-outline me-1" ></i>Print',
          className: 'dropdown-item',
          exportOptions: { columns: [3, 4, 5, 6, 7], format: { body: formatExportCell } },
          customize: function (win) {
            if (typeof config !== 'undefined') {
              $(win.document.body)
                .css('color', config.colors.headingColor)
                .css('border-color', config.colors.borderColor)
                .css('background-color', config.colors.bodyBg);
            }
            $(win.document.body)
              .find('table')
              .addClass('compact')
              .css('color', 'inherit')
              .css('border-color', 'inherit')
              .css('background-color', 'inherit');
          }
        },
        {
          extend: 'csv',
          text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
          className: 'dropdown-item',
          exportOptions: { columns: [3, 4, 5, 6, 7], format: { body: formatExportCell } }
        },
        {
          extend: 'excel',
          text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
          className: 'dropdown-item',
          exportOptions: { columns: [3, 4, 5, 6, 7], format: { body: formatExportCell } }
        },
        {
          extend: 'pdf',
          text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
          className: 'dropdown-item',
          exportOptions: { columns: [3, 4, 5, 6, 7], format: { body: formatExportCell } }
        },
        {
          extend: 'copy',
          text: '<i class="mdi mdi-content-copy me-1" ></i>Copy',
          className: 'dropdown-item',
          exportOptions: { columns: [3, 4, 5, 6, 7], format: { body: formatExportCell } }
        }
      ]
    }
  ];

  // Export cell formatter
  function formatExportCell(inner) {
    if (!inner || inner.length <= 0) return inner;
    var el = $.parseHTML(inner);
    var result = '';
    $.each(el, function (index, item) {
      if (item.classList !== undefined && item.classList.contains('user-name')) {
        result = result + item.lastChild.firstChild.textContent;
      } else if (item.innerText === undefined) {
        result = result + item.textContent;
      } else result = result + item.innerText;
    });
    return result;
  }

  // Destroy DataTable & its Buttons cleanly
  function destroyTable() {
    if ($.fn.DataTable.isDataTable(dt_basic_table)) {
      try {
        var inst = dt_basic_table.DataTable();
        if (inst.buttons) {
          inst.buttons().destroy();
        }
      } catch (e) {
        // ignore
      }
      dt_basic_table.DataTable().clear().destroy();
      // If you cloned header rows earlier for filters, ensure shown/cleaned:
      dt_basic_table.find('thead tr').show();
    }
  }

  // Init empty table on page load
  dt_basic_table.DataTable({
    processing: true,
    serverSide: false,
    deferLoading: 0, // forces initial draw with empty data
    data: [], // no rows initially
    columns: [
      { data: null, render: (d, t, r, meta) => meta.row + 1 },
      { data: 'jenis_dokumen' },
      { data: 'dpnomor' },
      { data: 'dptanggal' },
      { data: 'bpbnomor' },
      { data: 'bpbtanggal' },
      { data: 'pemasok_pengirim' },
      { data: 'kode_barang' },
      { data: 'nama_barang' },
      { data: 'sat' },
      { data: 'jumlah' },
      { data: 'nilai_barang' },
      { data: 'nilai_barang_usd' }
    ],
    language: {
      emptyTable: 'No data available in table' // custom text if you want
    },
    dom:
      // '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0">B>' +
      '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>>' +
      '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>' +
      '<"table-responsive"t>' +
      '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    buttons: exportButtons
  });
  // create/refresh the datatable with params
  function loadTable(jenis, dari, sampai) {
    // Save last search parameters
    localStorage.setItem('pemasukan_last_search', JSON.stringify({ jenis, dari, sampai }));

    // UI: show spinner, disable button
    $spinner.show();
    $viewBtn.prop('disabled', true).html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    `);

    // Destroy any existing table instance
    destroyTable();
    let lastNo = 0;
    let lastDpNomor = null;
    let lastBpbNomor = null;

    var dt = dt_basic_table.DataTable({
      processing: true,
      serverSide: false,
      ordering: false,
      ajax: {
        url: pemasukanUrl,
        type: 'GET',
        data: { jenisdok: jenis, dari: dari, sampai: sampai },
        error: function (xhr, status, err) {
          console.error('AJAX Error:', err);
          restoreUI();
        }
      },
      // columns: [
      //   // NO
      //   {
      //     data: null,
      //     orderable: false,
      //     render: function (d, t, r, meta) {
      //       if (meta.row === 0) {
      //         lastNo = 1;
      //         lastDpNomor = r.dpnomor;
      //         lastBpbNomor = r.bpbnomor;
      //         return lastNo;
      //       }
      //       if (r.dpnomor !== lastDpNomor) {
      //         lastNo++;
      //         lastDpNomor = r.dpnomor;
      //         lastBpbNomor = r.bpbnomor;
      //         return lastNo;
      //       }
      //       return '';
      //     }
      //   },
      //   { data: 'jenis_dokumen', orderable: false },
      //   { data: 'dpnomor', orderable: false },

      //   // DP Tanggal
      //   {
      //     data: 'dptanggal',
      //     orderable: false,
      //     render: function (data, t, r, meta) {
      //       if (meta.row === 0) {
      //         lastDpNomor = r.dpnomor;
      //         return formatDate(data);
      //       }
      //       if (r.dpnomor !== lastDpNomor) {
      //         return formatDate(data);
      //       }
      //       return '';
      //       // return r.dpnomor === lastDpNomor ? '' : formatDate(data);
      //     }
      //   },

      //   // BPB Nomor
      //   {
      //     data: 'bpbnomor',
      //     orderable: false,
      //     render: function (data, type, row, meta) {
      //       if (meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor) {
      //         lastBpbNomor = row.bpbnomor;
      //         return data;
      //       }
      //       return '';
      //     }
      //   },

      //   // BPB Tanggal
      //   {
      //     data: 'bpbtanggal',
      //     orderable: false,
      //     render: function (data, type, row, meta) {
      //       if (meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor) {
      //         return formatDate(data);
      //       }
      //       return '';
      //     }
      //   },

      //   // Pemasok Pengirim
      //   {
      //     data: 'pemasok_pengirim',
      //     orderable: false,
      //     render: function (data, type, row, meta) {
      //       if (meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor) {
      //         return data;
      //       }
      //       return '';
      //     }
      //   },

      //   // Kolom barang & nilai
      //   { data: 'kode_barang', orderable: false },
      //   { data: 'nama_barang', orderable: false },
      //   { data: 'sat', orderable: false },
      //   {
      //     data: 'jumlah',
      //     orderable: false,
      //     render: data => (data == 0 ? '--' : numberFormat(data, 2, '.', ','))
      //   },
      //   {
      //     data: 'nilai_barang',
      //     orderable: false,
      //     render: data => (data == 0 ? '--' : `Rp. ${numberFormat(data, 2, '.', ',')}`)
      //   },
      //   {
      //     data: 'nilai_barang_usd',
      //     orderable: false,
      //     render: data => (data == 0 ? '--' : `$. ${numberFormat(data, 2, '.', ',')}`)
      //   }
      // ],
      columns: [
        // NO
        {
          data: null,
          orderable: false,
          render: function (d, t, r, meta) {
            if (meta.row === 0 || r.dpnomor !== lastDpNomor) {
              lastNo++;
              return lastNo;
            }
            return '';
          }
        },
        { data: 'jenis_dokumen', orderable: false },
        { data: 'dpnomor', orderable: false },

        // DP Tanggal
        {
          data: 'dptanggal',
          orderable: false,
          render: function (data, t, r, meta) {
            return meta.row === 0 || r.dpnomor !== lastDpNomor ? formatDate(data) : '';
          }
        },

        // BPB Nomor
        {
          data: 'bpbnomor',
          orderable: false,
          render: function (data, type, row, meta) {
            return meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor ? data : '';
          }
        },

        // BPB Tanggal
        {
          data: 'bpbtanggal',
          orderable: false,
          render: function (data, type, row, meta) {
            return meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor
              ? formatDate(data)
              : '';
          }
        },

        // Pemasok Pengirim
        {
          data: 'pemasok_pengirim',
          orderable: false,
          render: function (data, type, row, meta) {
            return meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor ? data : '';
          }
        },

        { data: 'kode_barang', orderable: false },
        { data: 'nama_barang', orderable: false },
        { data: 'sat', orderable: false },
        {
          data: 'jumlah',
          orderable: false,
          render: data => (data == 0 ? '--' : numberFormat(data, 2, '.', ','))
        },
        {
          data: 'nilai_barang',
          orderable: false,
          render: data => (data == 0 ? '--' : `Rp. ${numberFormat(data, 2, '.', ',')}`)
        },
        {
          data: 'nilai_barang_usd',
          orderable: false,
          render: function (data, t, r) {
            // update di kolom terakhir supaya semua kolom sebelumnya
            // baca nilai lastDpNomor & lastBpbNomor yang konsisten
            lastDpNomor = r.dpnomor;
            lastBpbNomor = r.bpbnomor;
            return data == 0 ? '--' : `$. ${numberFormat(data, 2, '.', ',')}`;
          }
        }
      ],
      dom:
        '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0">>' +
        '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>' +
        '<"table-responsive"t>' +
        '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      initComplete: function () {
        try {
          new $.fn.dataTable.Buttons(dt, { buttons: exportButtons });
          dt.buttons(0, null).container().appendTo($('.dt-action-buttons').empty());
        } catch (e) {
          console.warn('Buttons init failed:', e);
        }
        restoreUI();
      },
      drawCallback: function () {
        lastDpNomor = null;
        lastBpbNomor = null;
        lastNo = 0;
      },
      rowCallback: function (row, data, index) {
        // Update tracker setelah baris dirender
        lastBpbNomor = data.bpbnomor;
        lastDpNomor = data.dpnomor;
      }
    });
    // Older
    // var dt = dt_basic_table.DataTable({
    //   processing: true,
    //   serverSide: false,
    //   ordering: false,
    //   ajax: {
    //     url: pemasukanUrl,
    //     type: 'GET',
    //     data: { jenisdok: jenis, dari: dari, sampai: sampai },
    //     error: function (xhr, status, err) {
    //       console.error('AJAX Error:', err);
    //       restoreUI();
    //     }
    //   },
    //   columns: [
    //     {
    //       data: null,
    //       render: function (d, t, r, meta) {
    //         // Baris pertama tabel
    //         if (meta.row === 0) {
    //           lastNo = 1;
    //           return lastNo;
    //         }

    //         // Baris berikutnya
    //         if (r.dpnomor !== lastDpNomor) {
    //           lastDpNomor = r.dpnomor;
    //           lastNo++;
    //           return lastNo;
    //         }

    //         // Kalau dpnomor sama → kosong
    //         return '';
    //       }
    //     },
    //     { data: 'jenis_dokumen' },
    //     {
    //       data: 'dpnomor',
    //       render: function (data, type, row, meta) {
    //         if (type === 'display') {
    //           if (lastDpNomor === data) {
    //             return ''; // sama dengan sebelumnya, kosongkan
    //           } else {
    //             lastDpNomor = data;
    //             return data;
    //           }
    //         }
    //         return data;
    //       }
    //     },
    //     {
    //       data: 'dptanggal',
    //       render: function (data, type, row, meta) {
    //         // Baris pertama
    //         if (meta.row === 0) {
    //           lastDpNomor = row.dpnomor;
    //           return formatDate(data);
    //         }
    //         // Baris berikutnya
    //         if (row.dpnomor === lastDpNomor) {
    //           return ''; // Kosong jika dpnomor sama
    //         } else {
    //           lastDpNomor = row.dpnomor;
    //           return formatDate(data);
    //         }
    //       }
    //     },
    //     { data: 'bpbnomor' },
    //     { data: 'bpbtanggal', render: data => formatDate(data) },
    //     { data: 'pemasok_pengirim' },
    //     { data: 'kode_barang' },
    //     { data: 'nama_barang' },
    //     { data: 'sat' },
    //     { data: 'jumlah', render: data => numberFormat(data, 2, '.', ',') },
    //     { data: 'nilai_barang', render: data => `Rp. ${numberFormat(data, 2, '.', ',')}` },
    //     { data: 'nilai_barang_usd', render: data => `$. ${numberFormat(data, 2, '.', ',')}` }
    //   ],
    //   dom:
    //     '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0">>' +
    //     '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>' +
    //     '<"table-responsive"t>' +
    //     '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    //   initComplete: function () {
    //     try {
    //       new $.fn.dataTable.Buttons(dt, { buttons: exportButtons });
    //       dt.buttons(0, null).container().appendTo($('.dt-action-buttons').empty());
    //     } catch (e) {
    //       console.warn('Buttons init failed:', e);
    //     }
    //     restoreUI();
    //   },
    //   drawCallback: function () {
    //     lastDpNomor = null; // reset setiap kali tabel di-render ulang
    //     lastNo = 0;
    //   }
    // });

    // Helper to format date like PHP date('d/m/Y')
    function formatDate(dateStr) {
      if (!dateStr) return '';
      let d = new Date(dateStr);
      return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
    }

    function restoreUI() {
      $spinner.hide();
      $viewBtn.prop('disabled', false).html('View');
    }

    return dt;
  }
  // View click -> load table
  $viewBtn.on('click', function () {
    const jenis = $('#exampleFormControlSelect1').val();
    const dari = $('#tanggal_dari').val();
    const sampai = $('#tanggal_sampai').val();
    loadTable(jenis, dari, sampai);
  });

  // Add New record
  // ? Remove/Update this code as per your requirements
  var count = 101;
  // On form submit, if form is valid
  fv.on('core.form.valid', function () {
    var $new_name = $('.add-new-record .dt-full-name').val(),
      $new_post = $('.add-new-record .dt-post').val(),
      $new_email = $('.add-new-record .dt-email').val(),
      $new_date = $('.add-new-record .dt-date').val(),
      $new_salary = $('.add-new-record .dt-salary').val();

    if ($new_name != '') {
      dt_basic.row
        .add({
          id: count,
          full_name: $new_name,
          post: $new_post,
          email: $new_email,
          start_date: $new_date,
          salary: '$' + $new_salary,
          status: 5
        })
        .draw();
      count++;

      // Hide offcanvas using javascript method
      offCanvasEl.hide();
    }
  });

  // Delete Record
  $('.datatables-basic tbody').on('click', '.delete-record', function () {
    dt_basic.row($(this).parents('tr')).remove().draw();
  });

  // Complex Header DataTable
  // --------------------------------------------------------------------

  if (dt_complex_header_table.length) {
    var dt_complex = dt_complex_header_table.DataTable({
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'full_name' },
        { data: 'email' },
        { data: 'city' },
        { data: 'post' },
        { data: 'salary' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['status'];
            var $status = {
              1: { title: 'Current', class: 'bg-label-primary' },
              2: { title: 'Professional', class: ' bg-label-success' },
              3: { title: 'Rejected', class: ' bg-label-danger' },
              4: { title: 'Resigned', class: ' bg-label-warning' },
              5: { title: 'Applied', class: ' bg-label-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              '</div>' +
              '</div>' +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit"><i class="mdi mdi-pencil-outline"></i></a>'
            );
          }
        }
      ],
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100]
    });
  }

  // Row Grouping
  // --------------------------------------------------------------------

  var groupColumn = 2;
  if (dt_row_grouping_table.length) {
    var groupingTable = dt_row_grouping_table.DataTable({
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: '' },
        { data: 'full_name' },
        { data: 'post' },
        { data: 'email' },
        { data: 'city' },
        { data: 'start_date' },
        { data: 'salary' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          targets: 0,
          searchable: false,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        { visible: false, targets: groupColumn },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['status'];
            var $status = {
              1: { title: 'Current', class: 'bg-label-primary' },
              2: { title: 'Professional', class: ' bg-label-success' },
              3: { title: 'Rejected', class: ' bg-label-danger' },
              4: { title: 'Resigned', class: ' bg-label-warning' },
              5: { title: 'Applied', class: ' bg-label-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              '</div>' +
              '</div>' +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit"><i class="mdi mdi-pencil-outline"></i></a>'
            );
          }
        }
      ],
      order: [[groupColumn, 'asc']],
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before('<tr class="group"><td colspan="8">' + group + '</td></tr>');

              last = group;
            }
          });
      },
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });

    // Order by the grouping
    $('.dt-row-grouping tbody').on('click', 'tr.group', function () {
      var currentOrder = groupingTable.order()[0];
      if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
        groupingTable.order([groupColumn, 'desc']).draw();
      } else {
        groupingTable.order([groupColumn, 'asc']).draw();
      }
    });
  }

  // Multilingual DataTable
  // --------------------------------------------------------------------

  var lang = 'German';
  if (dt_multilingual_table.length) {
    var table_language = dt_multilingual_table.DataTable({
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: '' },
        { data: 'full_name' },
        { data: 'post' },
        { data: 'email' },
        { data: 'start_date' },
        { data: 'salary' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          targets: 0,
          searchable: false,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['status'];
            var $status = {
              1: { title: 'Current', class: 'bg-label-primary' },
              2: { title: 'Professional', class: ' bg-label-success' },
              3: { title: 'Rejected', class: ' bg-label-danger' },
              4: { title: 'Resigned', class: ' bg-label-warning' },
              5: { title: 'Applied', class: ' bg-label-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              '</div>' +
              '</div>' +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit"><i class="mdi mdi-pencil-outline"></i></a>'
            );
          }
        }
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/' + lang + '.json'
      },
      displayLength: 7,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      lengthMenu: [7, 10, 25, 50, 75, 100],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
  }

  if (dt_basic_table.length) {
    // Setup - add a text input to each footer cell
    $('.datatables-basic thead tr').clone(true).appendTo('.datatables-basic thead');
    $('.datatables-basic thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      var $input = $('<input type="text" class="form-control" placeholder="Search ' + title + '" />');

      // Add left and right border styles to the parent element
      $(this).css('border-left', 'none');
      if (i === $('.datatables-basic thead tr:eq(1) th').length - 1) {
        $(this).css('border-right', 'none');
      }

      $(this).html($input);

      $('input', this).on('keyup change', function () {
        if (dt_filter.column(i).search() !== this.value) {
          dt_filter.column(i).search(this.value).draw();
        }
      });
    });

    var dt_filter = dt_basic_table.DataTable({
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'full_name' },
        { data: 'email' },
        { data: 'post' },
        { data: 'city' },
        { data: 'start_date' },
        { data: 'salary' }
      ],
      orderCellsTop: true,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
    });
  }
  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
