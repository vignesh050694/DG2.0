package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.CountryDTO;
import com.datagreen.aggregator.dto.StateDTO;
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
public class StateService {
    @Autowired
    private IAMConnector iamConnector;

    @Autowired
    private ObjectMapper mapper;

    private final WebClient webClient;

    public StateService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<StateDTO> findByRevisionNoGreaterThan(Long revNo){
        List<StateDTO> stateList = new ArrayList<>();

        List response = webClient
                .get()
                .uri(String.join("", "/master/state/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(stateList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            stateList = mapper.readValue(json, new TypeReference<List<StateDTO>>() {});

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return stateList;
    }
}
