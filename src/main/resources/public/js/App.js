var App = function() {
  "use strict";

  var $orderDataTable;

  return {init: init};

  function init() {
    initLayout();
    initDatePicker();
    initOrderTable();
    initBackToTop();
  }

  function initLayout() {
    Nav.init();

    $('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
      e.stopPropagation();
    });

    $('body').on('click', '#btn-refresh', function(e) {
      $orderDataTable.fnClearTable(0);
      $orderDataTable.fnDraw();
    });
  }

  function initDatePicker() {
    $('#date-range span').html(moment().subtract('days', 1).format('YYYY/MM/DD')
        + ' - ' + moment().format('YYYY/MM/DD'));
    $('#date-range').daterangepicker(
        {
          ranges: {
            '今日': [moment(), moment()],
            '昨日': [moment().subtract('days', 1), moment().subtract('days', 1)],
            '本周': [moment().subtract('days', 6), moment()],
            '过去30天': [moment().subtract('days', 29), moment()],
            '本月': [moment().startOf('month'), moment().endOf('month')],
            '上个月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
          },
          opens: 'left',
          locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel: '起始日期',
            toLabel: '结束日期',
            weekLabel: 'W',
            customRangeLabel: '自定义日期范围',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            firstDay: 0
          },
          startDate: moment().subtract('days', 1),
          endDate: moment(),
          maxDate: moment()
        },
        function(start, end) {
          $('#date-range span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
        }
    );
  }

  function initBackToTop() {
    var backToTop = $('<a>', {id: 'back-to-top', href: '#top'});
    backToTop.appendTo('body');

    backToTop.hide();

    $(window).scroll(function() {
      if ($(this).scrollTop() > 150) {
        backToTop.fadeIn();
      } else {
        backToTop.fadeOut();
      }
    });

    backToTop.click(function(e) {
      e.preventDefault();

      $('body, html').animate({
        scrollTop: 0
      }, 600);
    });
  }

  function initOrderTable() {
    var $orderTable = $('#orderTable');
    var tableConfig = {};
    tableConfig.iDisplayLength = 10;
    tableConfig.aLengthMenu = [[10, 25, 50, -1], [10, 25, 50, "所有"]];
    tableConfig.bFilter = true;
    tableConfig.bSortClasses = false;
    tableConfig.bProcessing = true;
    tableConfig.bStateSave = true;
    tableConfig.bServerSide = true;
    tableConfig.sAjaxSource = "api/orders";

    tableConfig.oLanguage = {
      "sProcessing": "正在加载中  <img src='img/loading-bubbles.svg' />",
      "sLengthMenu": "每页显示 _MENU_ 条记录",
      "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
      "sInfoEmpty": "没有数据",
      "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
      "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "前一页",
        "sNext": "后一页",
        "sLast": "尾页"
      },
      "sZeroRecords": "没有检索到数据"
    };

    tableConfig.fnServerData = function(sSource, aoData, fnCallback) {
      $.ajax({
        type: 'GET',
        url: sSource,
        dataType: 'json',
        data: aoData,
        success: function(data) {
          if (!data.isError) {
            fnCallback(data.data);
          } else {
            
          }
        }
      });
    };

    tableConfig.fnRowCallback = function(nRow, aData, iDisplayIndex) {
      $('td:eq(0)', nRow).html('<input class="icheck-input" type="checkbox" value="' + aData[1] + '">');
      $('td:eq(0)', nRow).attr('width', '20px');
      if ('Pending' === aData[3]) {
        $('td:eq(3)', nRow).html('<span class="label label-default">Pending</span>');
      } else if ('Approved' === aData[3]) {
        $('td:eq(3)', nRow).html('<span class="label label-success">Approved</span>');
      }
      $('td:eq(4)', nRow).html('<a href="javascript:void(0);" class="btn btn-xs btn-primary" data-original-title="Approve">\
            <i class="fa fa-check"></i>\
          </a>');
      return nRow;
    };

    tableConfig.fnDrawCallback = function() {
      $('.icheck-input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        inheritClass: true
      }).on('ifChanged', function(e) {
        $(e.currentTarget).trigger('change');
      });
      $($orderDataTable.find('thead tr th:first')[0]).removeAttr('class');
    };

    tableConfig.aoColumns = [];
    $orderTable.find('thead tr th').each(function(index, value) {
      if (index === 0) {
        tableConfig.aoColumns.push({'bSortable': false});
      } else {
        tableConfig.aoColumns.push({'bSortable': true});
      }
    });

    // Create the datatable
    $orderDataTable = $orderTable.dataTable(tableConfig);
    var filterableCols = $orderDataTable.find('thead th').filter('[data-filterable="true"]');

    if (filterableCols.length > 0) {
      var columns = $orderDataTable.fnSettings().aoColumns,
          $row, th, $col, showFilter;

      $row = $('<tr>', {cls: 'dataTable-filter-row'}).appendTo($orderDataTable.find('thead'));

      for (var i = 0; i < columns.length; i++) {
        $col = $(columns[i].nTh.outerHTML);
        showFilter = ($col.data('filterable') === true) ? 'show' : 'hide';

        th = '<th class="' + $col.prop('class') + '">';
        th += '<input type="text" class="form-control input-sm ' + showFilter + '" placeholder="' + $col.text() + '">';
        th += '</th>';
        $row.append(th);
      }

      $orderDataTable.find('thead input').keyup(function() {
        $orderDataTable.fnFilter(this.value, $orderDataTable.oApi._fnVisibleToColumnIndex(
            $orderDataTable.fnSettings(), $orderDataTable.find('thead input[type=text]').index(this)));
      });

      $orderDataTable.addClass('datatable-columnfilter');
    }

    $('.dataTables_filter input').prop('placeholder', 'Search...');
  }
}();

$(function() {
  App.init();
});