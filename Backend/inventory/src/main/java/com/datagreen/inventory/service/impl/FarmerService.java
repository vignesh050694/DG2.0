package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.dto.FarmerDTO;
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

    public FarmerDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/farmer/farmer/by-id?id=", id))
                .retrieve()
                .bodyToMono(FarmerDTO.class).block();
    }
}
