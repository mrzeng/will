/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author yanshuai
 */
public class JDataTable {
    private int sEcho;
    private int iTotalRecords;
    private int iTotalDisplayRecords;
    private String[][] aaData;

    public void setSEcho(int sEcho) {
        this.sEcho = sEcho;
    }

    @JsonProperty("sEcho")
    public int getSEcho() {
        return sEcho;
    }

    public void setITotalRecords(int iTotalRecords) {
        this.iTotalRecords = iTotalRecords;
    }

    @JsonProperty("iTotalRecords")
    public int getITotalRecords() {
        return iTotalRecords;
    }

    public void setITotalDisplayRecords(int iTotalDisplayRecords) {
        this.iTotalDisplayRecords = iTotalDisplayRecords;
    }

    @JsonProperty("iTotalDisplayRecords")
    public int getITotalDisplayRecords() {
        return iTotalDisplayRecords;
    }

    public void setAaData(String[][] aaData) {
        this.aaData = aaData;
    }

    @JsonProperty("aaData")
    public String[][] getAaData() {
        return aaData;
    }
}
