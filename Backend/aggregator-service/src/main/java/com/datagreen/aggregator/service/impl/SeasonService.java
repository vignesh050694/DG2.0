package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.VillageDTO;
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
public class SeasonService {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;

    private final WebClient webClient;

    public SeasonService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<BasicDTO> findByRevisionNoGreaterThan(Long revNo){
        List<BasicDTO> seasonList = new ArrayList<>();
        List response =   webClient
                .get()
                .uri(String.join("", "/master/season/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(seasonList.getClass()).block();
        try {
            String json = mapper.writeValueAsString(response);
            seasonList = mapper.readValue(json, new TypeReference<List<BasicDTO>>() {});

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return seasonList;
    }
}
