package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.dto.BasicDTO;
import com.datagreen.farmer.dto.VarietyDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class VarietyService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public VarietyService(WebClient webClient) {
        this.webClient = webClient;
    }

    public VarietyDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "master/variety/by-id?id="+id))
                .retrieve()
                .bodyToMono(VarietyDTO.class).block();
    }
}
