/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.bo;

import io.github.yanshuai.will.model.Order;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author yanshuai
 */
public class OrderBo {
    public List<Order> getOrders() {
        List<Order> orders = new ArrayList<Order>();
        for (int i = 0; i < 50; ++i) {
            Order order = new Order();
            order.setId(i);
            order.setDate(new Date());
            order.setStatus("approved");
            orders.add(order);
        }
        return orders;
    }
}
