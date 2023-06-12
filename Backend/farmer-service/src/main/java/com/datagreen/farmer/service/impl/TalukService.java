package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.dto.TalukDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
@Service
public class TalukService {

        final ObjectMapper mapper = new ObjectMapper();

        private final WebClient webClient;

        public TalukService(WebClient webClient) {
            this.webClient = webClient;
        }

    public TalukDTO findAll(){
        return webClient
                .get()
                .uri(String.join("", "/master/taluk/taluks"))
                .retrieve()
                .bodyToMono(TalukDTO.class).block();
    }
}
