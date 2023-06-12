package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dto.BuyerDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class BuyerService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public BuyerService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BuyerDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/master/buyer/by-id?id=", id))
                .retrieve()
                .bodyToMono(BuyerDTO.class).block();
    }
}
