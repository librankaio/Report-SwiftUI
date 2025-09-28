/**
 * DataTables Basic
 */
import { numberFormat } from './utils/number-format.js';

('use strict');

// let fv, offCanvasEl;
document.addEventListener('DOMContentLoaded', function (e) {
  //   (function () {
  //     const formAddNewRecord = document.getElementById('form-add-new-record');
  //     setTimeout(() => {
  //       const newRecord = document.querySelector('.create-new'),
  //         offCanvasElement = document.querySelector('#add-new-record');
  //       // To open offCanvas, to add new record
  //       if (newRecord) {
  //         newRecord.addEventListener('click', function () {
  //           offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
  //           // Empty fields on offCanvas open
  //           (offCanvasElement.querySelector('.dt-full-name').value = ''),
  //             (offCanvasElement.querySelector('.dt-post').value = ''),
  //             (offCanvasElement.querySelector('.dt-email').value = ''),
  //             (offCanvasElement.querySelector('.dt-date').value = ''),
  //             (offCanvasElement.querySelector('.dt-salary').value = '');
  //           // Open offCanvas with form
  //           offCanvasEl.show();
  //         });
  //       }
  //     }, 200);
  //     // Form validation for Add new record
  //     fv = FormValidation.formValidation(formAddNewRecord, {
  //       fields: {
  //         basicFullname: {
  //           validators: {
  //             notEmpty: {
  //               message: 'The name is required'
  //             }
  //           }
  //         },
  //         basicPost: {
  //           validators: {
  //             notEmpty: {
  //               message: 'Post field is required'
  //             }
  //           }
  //         },
  //         basicEmail: {
  //           validators: {
  //             notEmpty: {
  //               message: 'The Email is required'
  //             },
  //             emailAddress: {
  //               message: 'The value is not a valid email address'
  //             }
  //           }
  //         },
  //         basicDate: {
  //           validators: {
  //             notEmpty: {
  //               message: 'Joining Date is required'
  //             },
  //             date: {
  //               format: 'MM/DD/YYYY',
  //               message: 'The value is not a valid date'
  //             }
  //           }
  //         },
  //         basicSalary: {
  //           validators: {
  //             notEmpty: {
  //               message: 'Basic Salary is required'
  //             }
  //           }
  //         }
  //       },
  //       plugins: {
  //         trigger: new FormValidation.plugins.Trigger(),
  //         bootstrap5: new FormValidation.plugins.Bootstrap5({
  //           // Use this for enabling/changing valid/invalid class
  //           // eleInvalidClass: '',
  //           eleValidClass: '',
  //           rowSelector: '.col-sm-12'
  //         }),
  //         submitButton: new FormValidation.plugins.SubmitButton(),
  //         // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
  //         autoFocus: new FormValidation.plugins.AutoFocus()
  //       },
  //       init: instance => {
  //         instance.on('plugins.message.placed', function (e) {
  //           if (e.element.parentElement.classList.contains('input-group')) {
  //             e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
  //           }
  //         });
  //       }
  //     });
  //     // FlatPickr Initialization & Validation
  //     flatpickr(formAddNewRecord.querySelector('[name="basicDate"]'), {
  //       enableTime: false,
  //       // See https://flatpickr.js.org/formatting/
  //       dateFormat: 'm/d/Y',
  //       // After selecting a date, we need to revalidate the field
  //       onChange: function () {
  //         fv.revalidateField('basicDate');
  //       }
  //     });
  //   })();
});

// datatable (jquery)
$(function () {
  var dt_basic_table = $('.datatables-basic');

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
        },
        {
          text: '<i class="mdi mdi-download me-1"></i>Download Excel',
          className: 'dropdown-item',
          action: function () {
            const tanggal_dari = $('#tanggal_dari').val();
            const tanggal_sampai = $('#tanggal_sampai').val();
            const jenisdok = $('#exampleFormControlSelect1').val();
            // const jenisPencarian = $('#jenis_pencarian').val();
            // const nilaiPencarian = $('#nilai_pencarian').val();

            let url = pemasukanExcelUrl + `?dari=${tanggal_dari}&sampai=${tanggal_sampai}&jenisdok=${jenisdok}`;
            // `&jenis_pencarian=${jenisPencarian}&nilai_pencarian=${nilaiPencarian}`;
            // `&jenis_pencarian=${jenisPencarian}&nilai_pencarian=${nilaiPencarian}`;

            window.location.href = url;
          }
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
    columnDefs: [
      { targets: [1], width: '10px' }, // kolom Rupiah
      { targets: [2], width: '20px' }, // kolom Rupiah
      { targets: [11], width: '200px' }, // kolom Rupiah
      { targets: [12], width: '180px' } // kolom USD
    ],
    dom:
      // '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0">B>' +
      '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>>' +
      '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>' +
      '<"table-responsive"t>' +
      '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    buttons: exportButtons,
    initComplete: function () {
      let api = this.api();
      new $.fn.dataTable.Buttons(api, { buttons: exportButtons });
      api.buttons(0, null).container().appendTo($('#export-container').empty());
      // hapus border dropdown langsung di sini
      $('.dt-button-collection.dropdown-menu').css({
        border: 'none',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)' // opsional, biar lebih soft
      });
    }
  });

  // create/refresh the datatable with params
  function loadTable(jenis, dari, sampai, jenis_pencarian) {
    // Save last search parameters
    localStorage.setItem('pemasukan_last_search', JSON.stringify({ jenis, dari, sampai }));

    // UI: show spinner, disable button
    $spinner.show();
    $viewBtn.prop('disabled', true).html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    `);

    // Remove previous footer if exists
    $('#footerTotals').remove();
    // Destroy any existing table instance
    destroyTable();
    $(dt_basic_table).after(`
      <div class="row mt-3 g-3" id="footerTotals">
        <div class="col-12 col-md-6 d-flex flex-column">
          <label class="fw-bold text-start">Total Rp.</label>
          <input type="text" class="form-control" id="totalRp" readonly />
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <label class="fw-bold text-start">Total USD ($)</label>
          <input type="text" class="form-control" id="totalUsd" readonly />
        </div>
      </div>
    `);

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
        data: { jenisdok: jenis, dari: dari, sampai: sampai, jenis_pencarian: jenis_pencarian },
        error: function (xhr, status, err) {
          console.error('AJAX Error:', err);
          restoreUI();
        }
      },
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
        {
          data: 'dptanggal',
          orderable: false,
          render: function (data, t, r, meta) {
            return meta.row === 0 || r.dpnomor !== lastDpNomor ? formatDate(data) : '';
          }
        },
        {
          data: 'bpbnomor',
          orderable: false,
          render: function (data, type, row, meta) {
            return meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor ? data : '';
          }
        },
        {
          data: 'bpbtanggal',
          orderable: false,
          render: function (data, type, row, meta) {
            return meta.row === 0 || row.dpnomor !== lastDpNomor || row.bpbnomor !== lastBpbNomor
              ? formatDate(data)
              : '';
          }
        },
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
        // Reset grouping counters
        lastDpNomor = null;
        lastBpbNomor = null;
        lastNo = 0;

        let api = this.api();

        // Column index for nilai_barang (Rp)
        let totalRp = api
          .column(11, { search: 'applied' })
          .data()
          .reduce((sum, val) => {
            let num = parseFloat((val + '').replace(/[^\d.-]/g, '')) || 0;
            return sum + num;
          }, 0);

        // Column index for nilai_barang_usd ($)
        let totalUsd = api
          .column(12, { search: 'applied' })
          .data()
          .reduce((sum, val) => {
            let num = parseFloat((val + '').replace(/[^\d.-]/g, '')) || 0;
            return sum + num;
          }, 0);

        // Set to readonly inputs
        $('#totalRp').val(`Rp. ${numberFormat(totalRp, 2, '.', ',')}`);
        $('#totalUsd').val(`$ ${numberFormat(totalUsd, 2, '.', ',')}`);
      },
      rowCallback: function (row, data) {
        lastBpbNomor = data.bpbnomor;
        lastDpNomor = data.dpnomor;
      }
    });
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
    const jenis_pencarian = $('#jenis_pencarian').val();
    loadTable(jenis, dari, sampai, jenis_pencarian);
  });
});
