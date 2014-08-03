var App = function() {
  "use strict";

  var $orderDataTable;
  var aoColumns;
  var hideColumns;

  return {init: init};

  function init() {
    initLayout();
    initDatePicker();
    initOrderTableTitle();
    initFilterRuleTmpl();
    initOrderTableData();
    initBackToTop();
  }

  function initLayout() {
    Nav.init();

    $('#btn-refresh').on('click', function(e) {
      $orderDataTable.fnClearTable(0);
      $orderDataTable.fnDraw();
    });

    $('#btn-print').on('click', function(e) {
      alert($('input.icheck-input:checked').val());
    });

    $('#btn-filter').on('click', function() {
      $('#modal-filter').modal('show');
    });

    $('#btn-add-filter').on('click', function() {
      var $filterRuleTmpl = $('#filter-rule-template');
      var filterRule = $filterRuleTmpl.clone(true);
      filterRule.removeAttr('id');
      filterRule.removeAttr('class');
      var $filterRules = $filterRuleTmpl.parent();
      $filterRules.append(filterRule);
    });

    $('.filter-remove').on('click', function() {
      $(this).parent().parent().parent().remove();
    }).on('mouseenter', function() {
      this.style.cursor = 'pointer';
      $(this).attr('class', 'fa fa-times-circle');
    }).on('mouseleave', function() {
      $(this).attr('class', 'fa fa-times');
    });
    
    $('#btn-sure').on('click', function() {
      var $filterRules = $('#filter-rules');
      var filterRuleList = $filterRules.children(':not(#filter-rule-template)');
      var expression = '';
      for (var i = 0; i < filterRuleList.length; ++i) {
        if (0 !== i) {
          expression += ' AND ';
        }
        var filterRuleDom = filterRuleList[i];
        var key = $(filterRuleDom).find('.filter-field').val();
        var op = $(filterRuleDom).find('.filter-oprt').val();
        var val = $(filterRuleDom).find('.filter-val').val();
        var stmt = op.replace(/\{0\}/, key).replace(/\{1\}/, val);
        expression += stmt;
      }
      $('.dataTables_filter input').val(expression);
    });

    $('#icheck-all').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
      inheritClass: true
    }).on('ifChecked', function(e) {
      $('input.icheck-input:not(:checked)').iCheck('check');
    }).on('ifUnchecked', function(e) {
      var $notChecked = $('input.icheck-input:not(:checked)');
      if (0 === $notChecked.length) {
        $('input.icheck-input').iCheck('uncheck');
      }
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
          maxDate: moment(),
          minDate: moment().subtract('days', 60)
        },
    function(start, end) {
      $('#date-range span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
    }
    );
  }

  function initOrderTableTitle() {
    $.ajax({
      type: 'GET',
      url: 'api/order/title',
      async: false,
      success: function(data) {
        if (!data.isError) {
          aoColumns = [];
          aoColumns.push({'bSortable': false, 'sName': 'uuid'});
          hideColumns = [];
          var orderTitles = data.data;
          var $menuDivider = $('#menu-divider');
          var $orderTableHead = $('#orderTable thead tr');
          for (var i = 1; i < orderTitles.length; ++i) {
            var orderTitle = orderTitles[i];
            if (orderTitle.id > 0) {
              var li = '<li>';
              li += '<input class="icheck-menu" type="checkbox" data-column-id="';
              li += i;
              li += '" checked disabled>';
              li += orderTitle.name;
              li += '</li>';
              $menuDivider.before(li);
              var th = '<th>';
              th += orderTitle.name;
              th += '</th>';
              $orderTableHead.append(th);
              aoColumns.push({'bSortable': true, 'sName': orderTitle.name});
            } else {
              var li = '<li>';
              li += '<input class="icheck-menu" type="checkbox" data-column-id="';
              li += i;
              li += '">';
              li += orderTitle.name;
              li += '</li>';
              $menuDivider.after(li);
              var th = '<th>';
              th += orderTitle.name;
              th += '</th>';
              $orderTableHead.append(th);
              aoColumns.push({'bSortable': true, 'sName': orderTitle.name});
              hideColumns.push(i);
            }
          }

          $('.icheck-menu').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            inheritClass: true
          }).on('ifChecked', function(e) {
            var id = $(e.target).attr('data-column-id');
            $orderDataTable.fnSetColumnVis(id, true);
          }).on('ifUnchecked', function(e) {
            var id = $(e.target).attr('data-column-id');
            $orderDataTable.fnSetColumnVis(id, false);
          });
        }
      }
    });
  }

  function initFilterRuleTmpl() {
    var $filterField = $('#filter-rule-template').find('.filter-field');
    if (aoColumns) {
      for (var i = 1; i < aoColumns.length; ++i) {
        var opt = '<option>';
        opt += aoColumns[i].sName;
        opt += '</option>';
        $filterField.append(opt);
      }
    }
  }

  function initOrderTableData() {
    var $orderTable = $('#orderTable');
    var tableConfig = {};
    tableConfig.iDisplayLength = 10;
    tableConfig.aLengthMenu = [[10, 25, 50, -1], [10, 25, 50, "所有"]];
    tableConfig.bFilter = true;
    tableConfig.bSortClasses = false;
    tableConfig.bProcessing = true;
    tableConfig.bStateSave = false;
    tableConfig.bServerSide = true;
    tableConfig.sAjaxSource = "api/order/data";

    tableConfig.oLanguage = {
      "sProcessing": "<i class='fa fa-spinner fa-spin'></i><span>正在努力加载中...</span>",
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
      var dateRange = {
        "name": "dateRange",
        "value": $('#date-range span').html()
      };
      aoData.push(dateRange);
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
      return nRow;
    };

    tableConfig.fnDrawCallback = function() {
      $('input.icheck-input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        inheritClass: true
      }).on('ifChecked', function(e) {
        var $notChecked = $('input.icheck-input:not(:checked)');
        if (0 === $notChecked.length) {
          $('#icheck-all').iCheck('check');
        }
      }).on('ifUnchecked', function(e) {
        $('#icheck-all').iCheck('uncheck');
      });
      $($orderDataTable.find('thead tr th:first')[0]).removeAttr('class');
    };

    if (aoColumns) {
      tableConfig.aoColumns = aoColumns;
    }
    tableConfig.aoColumnDefs = [];
    tableConfig.aoColumnDefs.push({"bVisible": false, "aTargets": hideColumns});

    // Create the datatable
    $orderDataTable = $orderTable.dataTable(tableConfig);
    $('.dataTables_filter input').prop('placeholder', '过滤表达式...');
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
}();

$(function() {
  App.init();
});