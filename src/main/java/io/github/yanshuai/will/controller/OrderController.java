/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.controller;

import io.github.yanshuai.will.bo.OrderBo;
import io.github.yanshuai.will.model.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 *
 * @author yanshuai
 */
@Controller
public class OrderController {

    @Autowired
    private OrderBo orderBo;

    public Result getOrders() {
        try {
            return new Result(orderBo.getOrders());
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    private static final Logger LOG = LoggerFactory.getLogger(OrderController.class);
}
