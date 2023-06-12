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
public class CropService {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;

    private final WebClient webClient;

    public CropService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<BasicDTO> findByRevisionNoGreaterThan(Long revNo){
        List<BasicDTO> crops = new ArrayList<>();
        List response =   webClient
                .get()
                .uri(String.join("", "/master/crop/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(crops.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            crops = mapper.readValue(json, new TypeReference<List<BasicDTO>>() {});

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return crops;
    }

    public List<BasicDTO> getByIds(List<String> ids) {
        String commaSeparated = String.join(",", ids);
        List<BasicDTO> serviceDTOList = new ArrayList<>();

        List response = webClient
                .get()
                .uri(String.join("", "/master/crop/by-ids?ids=", commaSeparated))
                .retrieve()
                .bodyToMono(serviceDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            serviceDTOList = mapper.readValue(json, new TypeReference<List<BasicDTO>>() {
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return serviceDTOList;
    }
}
