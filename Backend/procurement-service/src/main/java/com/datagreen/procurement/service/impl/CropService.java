package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dto.BasicDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class CropService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public CropService(WebClient webClient) {
        this.webClient = webClient;
    }

    public BasicDTO getCropByGrade(String grade){
        return webClient
                .get()
                .uri(String.join("", "/master/crop/by-grade?grade=", grade))
                .retrieve()
                .bodyToMono(BasicDTO.class).block();
    }

    public List<BasicDTO> getByIds(List<String> ids) {
        String commaSeparated = String.join(",", ids);
        List<BasicDTO> serviceDTOList = new ArrayList<>();

        List response = webClient
                .get()
                .uri(String.join("", "/master/crop/by-ids?ids=", commaSeparated))
                .retrieve()
                .bodyToMono(serviceDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            serviceDTOList = mapper.readValue(json, new TypeReference<List<BasicDTO>>() {
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return serviceDTOList;
    }
}
