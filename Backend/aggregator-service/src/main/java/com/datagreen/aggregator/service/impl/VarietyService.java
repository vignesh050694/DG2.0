package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.VarietyDTO;
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
public class VarietyService {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;

    private final WebClient webClient;

    public VarietyService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<VarietyDTO> findByRevisionNoGreaterThan(Long revNo){
        List<VarietyDTO> crops = new ArrayList<>();
        List response =  webClient
                .get()
                .uri(String.join("", "/master/variety/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(crops.getClass()).block();
        try {
            String json = mapper.writeValueAsString(response);
            crops = mapper.readValue(json, new TypeReference<List<VarietyDTO>>() {});

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return crops;

    }



}
