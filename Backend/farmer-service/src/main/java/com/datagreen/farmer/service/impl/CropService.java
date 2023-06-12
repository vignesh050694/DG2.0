package com.datagreen.farmer.service.impl;


import com.datagreen.farmer.dto.BasicDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
@Service
public class CropService {

    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public CropService(WebClient webClient) {
        this.webClient = webClient;
    }

    public  BasicDTO findAll(){
        return webClient
                .get()
                .uri(String.join("", "/master/crop/crops"))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
}
//    public BasicDTO findById(String id) {
//        return webClient
//                .get()
//                .uri(String.join("", "/master/agent/by-id?id=", id))
//                .retrieve()
//                .bodyToMono(BasicDTO.class).block();
//    }