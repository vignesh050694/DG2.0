package com.datagreen.farmer.service.impl;
import com.datagreen.farmer.dto.BasicDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SubCategoryService {

    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public SubCategoryService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO findAll(){
        return webClient
                .get()
                .uri(String.join("", "/master/subCategory/subCategories"))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }
}
