package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.dto.WarehouseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WarehouseService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public WarehouseService(WebClient webClient) {
        this.webClient = webClient;
    }

    public WarehouseDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/master/warehouse/by-id?id=", id))
                .retrieve()
                .bodyToMono(WarehouseDTO.class).block();
    }
}
