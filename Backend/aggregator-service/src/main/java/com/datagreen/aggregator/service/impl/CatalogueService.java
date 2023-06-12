package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.BuyerDTO;
import com.datagreen.aggregator.dto.CatalogueDTO;
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
public class CatalogueService {

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IAMConnector iamConnector;


    private final WebClient webClient;

    public CatalogueService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<CatalogueDTO> findByRevisionNoGreaterThan(Long revNo){
        List<CatalogueDTO> catalogues = new ArrayList<>();
        List response =  webClient
                .get()
                .uri(String.join("", "/master/catalogue/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(catalogues.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            catalogues = mapper.readValue(json, new TypeReference<List<CatalogueDTO>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return catalogues;
    }


}
