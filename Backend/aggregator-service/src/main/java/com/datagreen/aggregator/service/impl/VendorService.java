package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.WarehouseDTO;
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
public class VendorService {

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;

    private final WebClient webClient;

    public VendorService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<BasicDTO> findByRevisionNoGreaterThan(Long revNo){
        List<BasicDTO> vendorList = new ArrayList<>();
        List response = webClient
                .get()
                .uri(String.join("", "/master/vendor/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(vendorList.getClass()).block();
        try {
            String json = mapper.writeValueAsString(response);
            vendorList = mapper.readValue(json, new TypeReference<List<BasicDTO>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return vendorList;

    }



}
