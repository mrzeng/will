/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.controller;

import io.github.yanshuai.will.bo.OrderBo;
import io.github.yanshuai.will.model.JDateRange;
import io.github.yanshuai.will.annotation.DateRange;
import io.github.yanshuai.will.model.JDataTable;
import io.github.yanshuai.will.model.Order;
import io.github.yanshuai.will.model.Result;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author yanshuai
 */
@Controller
@RequestMapping(value = "/api/order")
public class OrderController {

    @Autowired
    private OrderBo orderBo;

    @RequestMapping(value = "title", method = RequestMethod.GET)
    @ResponseBody
    public Result getOrderTitle() {
        try {
            return new Result(orderBo.getOrderTitles());
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "data", method = RequestMethod.GET)
    @ResponseBody
    public Result getOrderData(@RequestParam("sEcho") int sEcho,
            @RequestParam("iDisplayStart") int iDisplayStart,
            @RequestParam("iDisplayLength") int iDisplayLength,
            @RequestParam("iColumns") int iColumns,
            @RequestParam("sColumns") String[] sColumns,
            @RequestParam("sSearch") String sSearch,
            @RequestParam("iSortCol_0") int sortCol,
            @RequestParam("sSortDir_0") String sortDir,
            @RequestParam("dateRange") @DateRange JDateRange dateRange) {
        try {
            List<Order> orders = orderBo.getOrderData();
            JDataTable dataTable = new JDataTable();
            dataTable.setSEcho(sEcho);
            dataTable.setITotalRecords(orders.size());
            dataTable.setITotalDisplayRecords(orders.size());
            if (0 >= iDisplayLength) {
                iDisplayLength = orders.size();
            }
            String[][] data = new String[iDisplayLength][3];
            for (int i = 0; i < iDisplayLength; ++i) {
                Order order = orders.get(iDisplayStart + i);
                data[i] = order.toJDataRow();
            }
            dataTable.setAaData(data);
            return new Result(dataTable);
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "print", method = RequestMethod.POST)
    @ResponseBody
    public Result printOrders(@RequestParam("orders") String[] orders) {
        try {
            for (String order : orders) {
                orderBo.print(order);
            }
            return new Result(orders);
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    private static final Logger LOG = LoggerFactory.getLogger(OrderController.class);
}
