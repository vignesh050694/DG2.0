package com.datagreen.inventory.service.impl;


import com.datagreen.inventory.dto.Sequence;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SequenceService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public SequenceService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Sequence getSequence(String receipt){
        return webClient
                .get()
                .uri(String.join("", "/master/sequence?name=", receipt))
                .retrieve()
                .bodyToMono(Sequence.class).block();
    }

    public void incrementSequence(String receipt){
         webClient
                .get()
                .uri(String.join("", "/master/sequence/increment?name=", receipt))
                .retrieve()
                .bodyToMono(Sequence.class).block();
    }
}
