package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.dto.SubCategoryDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubCategoryService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public SubCategoryService(WebClient webClient) {
        this.webClient = webClient;
    }

    public SubCategoryDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/master/subCategory/by-id?id=", id))
                .retrieve()
                .bodyToMono(SubCategoryDTO.class).block();
    }

    public List<SubCategoryDTO> getByIds(List<String> ids) {
        String commaSeparated = String.join(",", ids);
        List<SubCategoryDTO> serviceDTOList = new ArrayList<>();

        List response = webClient
                .get()
                .uri(String.join("", "/master/subCategory/by-ids?ids=", commaSeparated))
                .retrieve()
                .bodyToMono(serviceDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            serviceDTOList = mapper.readValue(json, new TypeReference<List<SubCategoryDTO>>() {
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return serviceDTOList;
    }
}
