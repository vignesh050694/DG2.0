package com.datagreen.aggregator.config;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Component
@Order(1)
public class HeaderFilter implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) {
        String serialNo = request.getHeader(Constants.SERIAL_NO);
        String version = request.getHeader(Constants.VERSION_NO);
        Map<String, String> headers = new HashMap<>();
        headers.put("serialNo", serialNo);
        headers.put("version", version);
        HeaderContext.setCurrentHeader(headers);
        return true;
    }


}
