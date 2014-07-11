/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.model;

import java.util.List;

/**
 *
 * @author yanshuai
 */
public class Orders {
    private long lastUpdateTimestamp;
    private List<Order> orders;

    public Orders(long lastUpdateTimestamp, List<Order> orders) {
        this.lastUpdateTimestamp = lastUpdateTimestamp;
        this.orders = orders;
    }

    public void setLastUpdateTimestamp(long lastUpdateTimestamp) {
        this.lastUpdateTimestamp = lastUpdateTimestamp;
    }

    public long getLastUpdateTimestamp() {
        return lastUpdateTimestamp;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Order> getOrders() {
        return orders;
    }
}
