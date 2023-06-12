package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.GradeDTO;
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
public class GradeService {
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;

    private final WebClient webClient;

    public GradeService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<GradeDTO> findByRevisionNoGreaterThan(Long revNo){
        List<GradeDTO> serviceDTOList = new ArrayList<>();
        List response = webClient
                .get()
                .uri(String.join("", "/master/grade/by-revNo?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(serviceDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            serviceDTOList = mapper.readValue(json, new TypeReference<List<GradeDTO>>() {
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return serviceDTOList;
    }

    public List<GradeDTO> getByRevisionNo(List<String> ids) {
        String commaSeparated = String.join(",", ids);
        List<GradeDTO> serviceDTOList = new ArrayList<>();

        List response = webClient
                .get()
                .uri(String.join("", "/master/grade/by-revNo?revNo=", commaSeparated))
                .retrieve()
                .bodyToMono(serviceDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            serviceDTOList = mapper.readValue(json, new TypeReference<List<GradeDTO>>() {
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return serviceDTOList;
    }
}
