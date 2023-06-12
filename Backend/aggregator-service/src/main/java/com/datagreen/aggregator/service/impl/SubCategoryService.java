package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.BuyerDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.Basic;

@Service
public class SubCategoryService {

    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public SubCategoryService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO findByRevisionNoGreaterThan(String revNo){
        return webClient
                .get()
                .uri(String.join("", "/master/subCategory/by-revNo?revNo=", revNo))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }





}
