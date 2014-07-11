/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author yanshuai
 */
public class Order {
    private int id;
    private Date date;
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String[] toJDataRow() {
        String[] data = new String[5];
        data[1] = String.valueOf(this.getId());
        data[2] = df.format(this.getDate());
        data[3] = this.getStatus();
        return data;
    }

    private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
}
