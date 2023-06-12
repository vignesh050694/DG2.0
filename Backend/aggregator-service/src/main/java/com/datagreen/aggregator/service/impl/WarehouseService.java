package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.GradeDTO;
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
public class WarehouseService {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;


    private final WebClient webClient;

    public WarehouseService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<WarehouseDTO> findByRevisionNoGreaterThan(Long revNo){
        List<WarehouseDTO> serviceDTOList = new ArrayList<>();
        List response = webClient
                .get()
                .uri(String.join("", "/master/warehouse/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(serviceDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            serviceDTOList = mapper.readValue(json, new TypeReference<List<WarehouseDTO>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return serviceDTOList;
    }
}
