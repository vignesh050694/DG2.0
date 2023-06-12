package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.CountryDTO;
import com.datagreen.aggregator.dto.DistrictDTO;
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
public class DistrictService {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;

    private final WebClient webClient;

    public DistrictService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<DistrictDTO> findByRevisionNoGreaterThan(Long revNo) {
        List<DistrictDTO> ditrictList = new ArrayList<>();

        List response =  webClient
                .get()
                .uri(String.join("", "/master/district/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(ditrictList.getClass()).block();
        try {
            String json = mapper.writeValueAsString(response);
            ditrictList = mapper.readValue(json, new TypeReference<List<DistrictDTO>>() {});

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return ditrictList;
    }


}
