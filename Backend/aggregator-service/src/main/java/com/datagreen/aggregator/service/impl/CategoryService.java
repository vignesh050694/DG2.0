package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CategoryService {

    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public CategoryService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO findByRevisionNoGreaterThan(String revNo){
        return webClient
                .get()
                .uri(String.join("", "/master/category/by-revNo?revNo=", revNo))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }


}
