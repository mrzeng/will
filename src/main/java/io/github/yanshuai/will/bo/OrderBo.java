/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.bo;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.github.yanshuai.will.annotation.Colvis;
import io.github.yanshuai.will.dao.OrderDao;
import io.github.yanshuai.will.model.Order;
import io.github.yanshuai.will.model.OrderTitle;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
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

    private final List<OrderTitle> orderTitles;

    public OrderBo() {
        orderTitles = new ArrayList<OrderTitle>();
        Method[] methods = Order.class.getMethods();
        for (Method method : methods) {
            if (method.getName().startsWith("get") && !method.getName().equals("getClass")) {
                String name = method.getName().substring(3).toLowerCase();
                JsonProperty jp = method.getAnnotation(JsonProperty.class);
                if (null != jp) {
                    name = jp.value();
                }
                Colvis colvis = method.getAnnotation(Colvis.class);
                int id = Integer.MAX_VALUE;
                if (null != colvis) {
                    id = colvis.value();
                }
                orderTitles.add(new OrderTitle(name, id));
            }
        }
        Collections.sort(orderTitles);
    }

    public List<OrderTitle> getOrderTitles() {
        return orderTitles;
    }

    public List<Order> getOrderData() {
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
