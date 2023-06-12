package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dto.BasicDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class FarmService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public FarmService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/farmer/farm/by-id?id=", id))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
}
