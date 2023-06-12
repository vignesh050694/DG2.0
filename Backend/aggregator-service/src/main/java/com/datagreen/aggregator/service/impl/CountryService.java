package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.CountryDTO;
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
public class CountryService {
    @Autowired
    private IAMConnector iamConnector;

    @Autowired
    private ObjectMapper mapper;

    private final WebClient webClient;

    public CountryService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<CountryDTO> findByRevisionNoGreaterThan(Long revNo) {
        List<CountryDTO> countryDTOList = new ArrayList<>();
        List response = webClient
                .get()
                .uri(String.join("", "/master/country/by-rev?revNo=", revNo.toString()))
                .header("Authorization", iamConnector.getToken())
                .retrieve()
                .bodyToMono(countryDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            countryDTOList = mapper.readValue(json, new TypeReference<List<CountryDTO>>() {
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return countryDTOList;
    }


}
