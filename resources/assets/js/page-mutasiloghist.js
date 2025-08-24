/**
 * DataTables Basic
 */
import { numberFormat } from './utils/number-format.js';

('use strict');

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
    columns: [{ data: 'username' }, { data: 'tbl' }, { data: 'act' }, { data: 'datein' }],
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
  function loadTable(dari, sampai) {
    // Save last search parameters
    localStorage.setItem('mutasiwip_last_search', JSON.stringify({ dari, sampai }));

    $viewBtn.prop('disabled', true).html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    `);

    // Destroy any existing table instance
    destroyTable();

    var dt = dt_basic_table.DataTable({
      processing: true,
      serverSide: false,
      ordering: false,
      ajax: {
        url: mutasiLogHistUrl,
        type: 'GET',
        data: { dari: dari, sampai: sampai },
        error: function (xhr, status, err) {
          console.error('AJAX Error:', err);
          restoreUI();
        }
      },
      columns: [
        { data: 'username', orderable: false },
        { data: 'tbl', orderable: false },
        { data: 'act', orderable: false },
        {
          data: 'datein',
          orderable: false,
          render: data => formatDate(data)
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

        let api = this.api();

        // total stock_akhir (column index 4)
        // let totalStock = api
        //   .column(4, { search: 'applied' })
        //   .data()
        //   .reduce((sum, val) => {
        //     let num = parseFloat((val + '').replace(/[^\d.-]/g, '')) || 0;
        //     return sum + num;
        //   }, 0);

        // Set to readonly inputs
        // $('#totalStock').val(numberFormat(totalStock, 2, '.', ','));
      },
      rowCallback: function (row, data) {
        // lastBpbNomor = data.bpbnomor;
        // lastDpNomor = data.dpnomor;
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
    const dari = $('#tanggal_dari').val();
    const sampai = $('#tanggal_sampai').val();
    loadTable(dari, sampai);
  });
});
