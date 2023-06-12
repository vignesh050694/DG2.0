package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.BuyerDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.keycloak.connector.service.IAMConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuyerService {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;


    private final WebClient webClient;

    public BuyerService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<BuyerDTO> findByRevisionNoGreaterThan(Long revNo){
        List<BuyerDTO> buyerList = new ArrayList<>();

        List response =  webClient
                .get()
                .uri(String.join("", "/master/buyer/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(buyerList.getClass()).block();
        try {
            String json = mapper.writeValueAsString(response);
            buyerList = mapper.readValue(json, new TypeReference<List<BuyerDTO>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return buyerList;
    }
}
