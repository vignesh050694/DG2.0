package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.dto.TalukDTO;
import com.datagreen.farmer.dto.VillageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class VillageService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public VillageService(WebClient webClient) {
        this.webClient = webClient;
    }

    public VillageDTO findAll(){
        return webClient
                .get()
                .uri(String.join("", "/master/village/Villages"))
                .retrieve()
                .bodyToMono(VillageDTO.class).block();
    }

    public VillageDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/master/village/by-id?id=", id))
                .retrieve()
                .bodyToMono(VillageDTO.class).block();
    }
}
