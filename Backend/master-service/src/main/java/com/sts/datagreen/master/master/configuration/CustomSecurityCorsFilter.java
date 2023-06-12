package com.sts.datagreen.master.master.configuration;

import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * This {@link CustomSecurityCorsFilter} set CORS configuration for BROWSER clients before the run of {@link com.ineat.spring.keycloak.multitenant.HeaderBasedConfigResolver}
 * because the Spring Security CORS configuration is resolved after the {@link com.ineat.spring.keycloak.multitenant.HeaderBasedConfigResolver} which cause the realm header is never get
 * because the request preflight is blocked by the CORS policy.
 */
public class CustomSecurityCorsFilter extends GenericFilterBean {

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        HttpServletResponse res = (HttpServletResponse) response;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        HttpServletRequest req = (HttpServletRequest) request;

        if(req.getMethod().equals("OPTIONS")){
            ((HttpServletResponse) response).setStatus(200);
        }

        chain.doFilter(request, response);
    }
}