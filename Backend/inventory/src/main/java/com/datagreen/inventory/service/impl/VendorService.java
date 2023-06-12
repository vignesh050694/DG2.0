package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.dto.BasicDTO;
import com.datagreen.inventory.dto.WarehouseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class VendorService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public VendorService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO findById(String id) {
        return webClient
                .get()
                .uri(String.join("", "/master/vendor/by-id?id=", id))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
}
