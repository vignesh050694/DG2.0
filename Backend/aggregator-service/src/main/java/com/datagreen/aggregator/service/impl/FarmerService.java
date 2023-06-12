package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.FarmerDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class FarmerService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public FarmerService(WebClient webClient) {
        this.webClient = webClient;
    }

    public FarmerDTO findByRevisionNoGreaterThan(String revNo){
        return webClient
                .get()
                .uri(String.join("", "/master/farmer/by-revNo?revNo=", revNo))
                .retrieve()
                .bodyToMono(FarmerDTO.class).block();
    }
}
