package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.DistrictDTO;
import com.datagreen.aggregator.dto.TalukDTO;
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
public class VillageService {
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private IAMConnector iamConnector;

    private final WebClient webClient;

    public VillageService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<VillageDTO> findByRevisionNoGreaterThan(Long revNo){
        List<VillageDTO> villageList = new ArrayList<>();
        List response =  webClient
                .get()
                .uri(String.join("", "/master/village/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(villageList.getClass()).block();
        try {
            String json = mapper.writeValueAsString(response);
            villageList = mapper.readValue(json, new TypeReference<List<VillageDTO>>() {});

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return villageList;
    }
}
