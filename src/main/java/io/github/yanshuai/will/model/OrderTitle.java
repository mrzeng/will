/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.model;

/**
 *
 * @author yanshuai
 */
public class OrderTitle implements Comparable<OrderTitle> {

    private final String name;
    private final int id;

    public OrderTitle(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return String.format("col%d: %s", id, name);
    }

    public int compareTo(OrderTitle that) {
        if (0 <= this.id) {
            if (0 <= that.id) {
                return this.id - that.id;
            } else {
                return -1;
            }
        } else {
            if (0 > that.id) {
                return this.name.compareTo(that.name);
            } else {
                return 1;
            }
        }
    }
}
