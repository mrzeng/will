/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package io.github.yanshuai.will.bo;

import io.github.yanshuai.will.model.OrderTitle;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

/**
 *
 * @author yanshuai
 */
@ContextConfiguration(locations = "classpath*:applicationContext.xml")
public class OrderBoTest extends AbstractTestNGSpringContextTests {

    @Autowired
    private OrderBo orderBo;

    @Test
    public void testGetOrderTitle() {
        List<OrderTitle> orderTitles = orderBo.getOrderTitles();
        System.out.println(orderTitles);
    }
}
