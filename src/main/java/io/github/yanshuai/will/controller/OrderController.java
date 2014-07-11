/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.controller;

import io.github.yanshuai.will.bo.OrderBo;
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
@RequestMapping(value = "/api")
public class OrderController {

    @Autowired
    private OrderBo orderBo;

    @RequestMapping(value = "/orders", method = RequestMethod.GET)
    @ResponseBody
    public Result getOrders(@RequestParam("sEcho") int sEcho,
            @RequestParam("iDisplayStart") int iDisplayStart,
            @RequestParam("iDisplayLength") int iDisplayLength) {
        try {
            List<Order> orders = orderBo.getOrders();
            JDataTable dataTable = new JDataTable();
            dataTable.setSEcho(sEcho);
            dataTable.setITotalRecords(orders.size());
            dataTable.setITotalDisplayRecords(orders.size());
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

    private static final Logger LOG = LoggerFactory.getLogger(OrderController.class);
}
