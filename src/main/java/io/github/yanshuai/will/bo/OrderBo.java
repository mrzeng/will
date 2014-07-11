/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.bo;

import io.github.yanshuai.will.dao.OrderDao;
import io.github.yanshuai.will.model.Order;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author yanshuai
 */
public class OrderBo {
    
    @Autowired
    private OrderDao orderDao;

    public List<Order> getOrders() {
        if (null == orderDao.getOrders()) {
            Random random = new Random();
            List<Order> orders = new ArrayList<Order>();
            for (int i = 0; i < 50; ++i) {
                Order order = new Order();
                order.setId(i);
                order.setDate(new Date());
                if (random.nextInt() % 2 == 0) {
                    order.setStatus("Approved");
                } else {
                    order.setStatus("Pending");
                }
                orders.add(order);
            }
            orderDao.setOrders(orders);
        }
        return orderDao.getOrders();
    }
}
