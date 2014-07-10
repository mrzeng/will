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
public class Result {
    private boolean isError;
    private String message;
    private Object data;

    public Result() {
        this(false, null, null);
    }

    public Result(boolean isError, String message) {
        this(isError, message, null);
    }

    public Result(Object data) {
        this(false, null, data);
    }

    public Result(boolean isError, String message, Object data) {
        this.isError = isError;
        this.message = message;
        this.data = data;
    }

    public void setIsError(boolean isError) {
        this.isError = isError;
    }

    public boolean getIsError() {
        return isError;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Object getData() {
        return data;
    }
}
