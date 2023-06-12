package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.dto.BasicDTO;
import com.datagreen.farmer.dto.VarietyDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SeasonService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public SeasonService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "master/season/by-id?id="+id))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
}
