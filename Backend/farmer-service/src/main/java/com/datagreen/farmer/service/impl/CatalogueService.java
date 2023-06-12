package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.dto.BasicDTO;
import com.datagreen.farmer.dto.VillageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
@Service
public class CatalogueService {

    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public CatalogueService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO findAll(){
        return webClient
                .get()
                .uri(String.join("", "/master/catalogue/catalogues"))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
    public BasicDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/master/catalogue/by-id?id=", id))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }

    public BasicDTO findByType(String type){
        return webClient
                .get()
                .uri(String.join("", "/master/catalogue//by-type?type=", type))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
}
