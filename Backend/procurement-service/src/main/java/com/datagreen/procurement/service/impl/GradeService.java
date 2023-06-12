package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dto.GradeDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class GradeService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public GradeService(WebClient webClient) {
        this.webClient = webClient;
    }

    public GradeDTO findById(String id){
        return webClient
                .get()
                .uri(String.join("", "/master/grade/by-id?id=", id))
                .retrieve()
                .bodyToMono(GradeDTO.class).block();
    }

    public List<GradeDTO> getByIds(List<String> ids) {
        String commaSeparated = String.join(",", ids);
        List<GradeDTO> serviceDTOList = new ArrayList<>();

        List response = webClient
                .get()
                .uri(String.join("", "/master/grade/by-ids?ids=", commaSeparated))
                .retrieve()
                .bodyToMono(serviceDTOList.getClass()).block();

        try {
            String json = mapper.writeValueAsString(response);
            serviceDTOList = mapper.readValue(json, new TypeReference<List<GradeDTO>>() {
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return serviceDTOList;
    }
}
