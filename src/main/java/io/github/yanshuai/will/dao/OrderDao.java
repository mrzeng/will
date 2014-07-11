/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.dao;

import io.github.yanshuai.will.model.Order;
import io.github.yanshuai.will.model.Orders;
import java.util.Date;
import java.util.List;

/**
 *
 * @author yanshuai
 */
public class OrderDao {
    private Orders orders;

    public long getLastUpdateTimestamp() {
        if (null == orders) {
            return -1;
        }
        return orders.getLastUpdateTimestamp();
    }

    public List<Order> getOrders() {
        if (null != orders) {
            return orders.getOrders();
        }
        return null;
    }

    public void setOrders(List<Order> orders) {
        this.orders = new Orders(new Date().getTime(), orders);
    }
}
