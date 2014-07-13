var App = function() {
  "use strict";

  var $thisTable;
  var chartColors = ['#e5412d', '#f0ad4e', '#444', '#888', '#555', '#999', '#bbb', '#ccc', '#eee'];

  return {init: init, chartColors: chartColors, debounce: debounce};

  function init() {
    initLayout();
    initDatePicker();

    initICheck();
    initSelect2();
    initTableCheckable();

    initLightbox();
    initEnhancedAccordion();
    initDataTableHelper();

    initFormValidation();
    initTooltips();
    initColorpicker();
    initAutosize();

    initBackToTop();
    $('#btn-refresh').bind('click', refreshDataTable);
  }

  function refreshDataTable() {
    $thisTable.fnClearTable(0);
    $thisTable.fnDraw();
  }

  function initLayout() {
    $('#site-logo').prependTo('#wrapper');
    $('html').removeClass('no-js');

    Nav.init();

    $('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
      e.stopPropagation();
    });
  }

  function initTableCheckable() {
    if ($.fn.tableCheckable) {
      $('.table-checkable')
          .tableCheckable()
          .on('masterChecked', function(event, master, slaves) {
            if ($.fn.iCheck) {
              $(slaves).iCheck('update');
            }
          })
          .on('slaveChecked', function(event, master, slave) {
            if ($.fn.iCheck) {
              $(master).iCheck('update');
            }
          });
    }
  }

  function initDatePicker() {
    $('#date-range span').html(moment().subtract('days', 1).format('MM/DD/YYYY')
        + ' ~ ' + moment().format('MM/DD/YYYY'));
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
          $('#date-range span').html(start.format('MM/DD/YYYY') + ' ~ ' + end.format('MM/DD/YYYY'));
        }
    );
  }

  function initAutosize() {
    if ($.fn.autosize) {
      $('.ui-textarea-autosize').each(function() {
        if ($(this).data('animate')) {
          $(this).addClass('autosize-animate').autosize();
        } else {
          $(this).autosize();
        }
      });
    }
  }

  function initEnhancedAccordion() {
    $('.accordion .accordion-toggle').on('click', function(e) {
      $(e.target).parent().parent().parent().addClass('open');
    });

    $('.accordion .accordion-toggle').on('click', function(e) {
      $(this).parents('.panel').siblings().removeClass('open');
    });

    $('.accordion').each(function() {
      $(this).find('.panel-collapse.in').parent().addClass('open');
    });
  }

  function initFormValidation() {
    if ($.fn.parsley) {
      $('.parsley-form').each(function() {
        $(this).parsley({
          trigger: 'change',
          errors: {
            container: function(element, isRadioOrCheckbox) {
              if (element.parents('form').is('.form-horizontal')) {
                return element.parents("*[class^='col-']");
              }

              return element.parents('.form-group');
            }
          }
        });
      });
    }
  }

  function initLightbox() {
    if ($.fn.magnificPopup) {
      $('.ui-lightbox').magnificPopup({
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: true,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
          verticalFit: true,
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
      });

      $('.ui-lightbox-video, .ui-lightbox-iframe').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });

      $('.ui-lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
          }
        }
      });
    }
  }

  function initSelect2() {
    if ($.fn.select2) {
      $('.ui-select2').select2({allowClear: true, placeholder: "Select..."});
    }
  }

  function initColorpicker() {
    if ($.fn.simplecolorpicker) {
      $('.ui-colorpicker').each(function(i) {
        var picker = $(this).data('picker');

        $(this).simplecolorpicker({
          picker: picker
        });
      });
    }
  }

  function initTooltips() {
    if ($.fn.tooltip) {
      $('.ui-tooltip').tooltip();
    }
    if ($.fn.popover) {
      $('.ui-popover').popover({container: 'body'});
    }
  }

  function initICheck() {
    if ($.fn.iCheck) {
      $('.icheck-input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        inheritClass: true
      }).on('ifChanged', function(e) {
        $(e.currentTarget).trigger('change');
      });
    }
  }

  function initBackToTop() {
    var backToTop = $('<a>', {id: 'back-to-top', href: '#top'});
    var icon = $('<i>', {class: 'fa fa-chevron-up'});

    backToTop.appendTo('body');
    icon.appendTo(backToTop);

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

  function initDataTableHelper() {
    if ($.fn.dataTable) {
      $('#orders').each(function() {
        $(this).addClass('dataTable-helper');
        var defaultOptions = {
          paginate: true,
          search: true,
          info: true,
          lengthChange: true,
          displayRows: 10
        },
        dataOptions = $(this).data(),
            helperOptions = $.extend(defaultOptions, dataOptions),
            tableConfig = {};

        tableConfig.iDisplayLength = helperOptions.displayRows;
        tableConfig.bFilter = true;
        tableConfig.bSort = true;
        tableConfig.bPaginate = false;
        tableConfig.bLengthChange = false;
        tableConfig.bInfo = false;
        tableConfig.bProcessing = false;
        tableConfig.bStateSave = true;
        tableConfig.bServerSide = true;
        tableConfig.sAjaxSource = "api/orders";
        tableConfig.oLanguage = {
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
          "sZeroRecords": "没有检索到数据",
          "sProcessing": "<img src='./loading.gif' />"
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
              }
            }
          });
        };
        tableConfig.fnRowCallback = function(nRow, aData, iDisplayIndex) {
          $('td:eq(0)', nRow).html('<input class="icheck-input" type="checkbox" value="' + aData[1] + '">');
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
        tableConfig.fnDrawCallback = function(oInstance, oSettings, json) {
          initICheck();
        };

        if (helperOptions.paginate) {
          tableConfig.bPaginate = true;
        }
        if (helperOptions.lengthChange) {
          tableConfig.bLengthChange = true;
        }
        if (helperOptions.info) {
          tableConfig.bInfo = true;
        }
        if (helperOptions.search) {
          $(this).parent().removeClass('datatable-hidesearch');
        }

        tableConfig.aaSorting = [];
        tableConfig.aoColumns = [];

        $(this).find('thead tr th').each(function(index, value) {
          var sortable = ($(this).data('sortable') === true) ? true : false;
          tableConfig.aoColumns.push({'bSortable': sortable});

          if ($(this).data('direction')) {
            tableConfig.aaSorting.push([index, $(this).data('direction')]);
          }
        });

        // Create the datatable
        $thisTable = $(this).dataTable(tableConfig);

        if (!helperOptions.search) {
          $thisTable.parent().find('.dataTables_filter').remove();
        }

        var filterableCols = $thisTable.find('thead th').filter('[data-filterable="true"]');

        if (filterableCols.length > 0) {
          var columns = $thisTable.fnSettings().aoColumns,
              $row, th, $col, showFilter;

          $row = $('<tr>', {cls: 'dataTable-filter-row'}).appendTo($thisTable.find('thead'));

          for (var i = 0; i < columns.length; i++) {
            $col = $(columns[i].nTh.outerHTML);
            showFilter = ($col.data('filterable') === true) ? 'show' : 'hide';

            th = '<th class="' + $col.prop('class') + '">';
            th += '<input type="text" class="form-control input-sm ' + showFilter + '" placeholder="' + $col.text() + '">';
            th += '</th>';
            $row.append(th);
          }

          $row.find('th').removeClass('sorting sorting_disabled sorting_asc sorting_desc sorting_asc_disabled sorting_desc_disabled');

          $thisTable.find('thead input').keyup(function() {
            $thisTable.fnFilter(this.value, $thisTable.oApi._fnVisibleToColumnIndex(
                $thisTable.fnSettings(), $thisTable.find('thead input[type=text]').index(this)));
          });

          $thisTable.addClass('datatable-columnfilter');
        }
      });

      $('.dataTables_filter input').prop('placeholder', 'Search...');
    }
  }

  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();

      var later = function() {
        var last = (new Date()) - timestamp;

        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate)
            result = func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }

      if (callNow)
        result = func.apply(context, args);
      return result;
    };
  }
}();



var Nav = function() {

  return {init: init};

  function init() {
    var mainnav = $('#main-nav'),
        openActive = mainnav.is('.open-active'),
        navActive = mainnav.find('> .active');

    mainnav.find('> .dropdown > a').bind('click', navClick);

    if (openActive && navActive.is('.dropdown')) {
      navActive.addClass('opened').find('.sub-nav').show();
    }
  }

  function navClick(e) {
    e.preventDefault();

    var li = $(this).parents('li');

    if (li.is('.opened')) {
      closeAll();
    } else {
      closeAll();
      li.addClass('opened').find('.sub-nav').slideDown();
    }
  }

  function closeAll() {
    $('.sub-nav').slideUp().parents('li').removeClass('opened');
  }
}();


$(function() {
  App.init();
});