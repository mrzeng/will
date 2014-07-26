/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import org.testng.annotations.Test;

/**
 *
 * @author yanshuai
 */
public class OrderTest {

    @Test
    public void testToJsonString() throws Exception {
        Order order = new Order();
        order.setId(10);
        order.setDate(new Date());
        order.setStatus("关闭");
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(objectMapper.writeValueAsString(order));
    }
}
