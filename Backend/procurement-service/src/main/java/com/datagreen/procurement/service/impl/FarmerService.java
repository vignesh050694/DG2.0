package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dto.BasicDTO;
import com.datagreen.procurement.dto.FarmerDTO;
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

    public BasicDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/farmer/farmer/by-id?id=", id))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
}
