package com.datagreen.report.config;


import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;
import reactor.netty.tcp.TcpClient;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebClientConfiguration {
    public static final int TIMEOUT = 3000;
    private static final String BASE_URL = System.getenv("gateway_url");

    @Autowired
    HttpServletRequest httpServletRequest;

    //private static final String BASE_URL = "http://localhost:8111/";


    @Bean
    public WebClient webClientWithTimeout() {
        final TcpClient tcpClient = TcpClient
                .create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, TIMEOUT)
                .doOnConnected(connection -> {
                    connection.addHandlerLast(new ReadTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS));
                    connection.addHandlerLast(new WriteTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS));
                });


        return WebClient.builder()
                .baseUrl(BASE_URL)
                //.filter(authorizeWithToken())
                .filter((request, next) -> next.exchange(
                        withBearerAuth(request, httpServletRequest.getHeader("Authorization"))))
                .clientConnector(new ReactorClientHttpConnector(HttpClient.from(tcpClient)))
                .build();

    }

    private ClientRequest withBearerAuth(ClientRequest request,
                                         String token) {
        return ClientRequest.from(request)
                .headers(header -> {
                    header.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
                    header.set("REALM", httpServletRequest.getHeader("REALM"));
                })
                .build();
    }
}
