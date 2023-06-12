package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.dto.MobileUserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MobileUserService {
    final ObjectMapper mapper = new ObjectMapper();

    private final WebClient webClient;

    public MobileUserService(WebClient webClient) {
        this.webClient = webClient;
    }

    public MobileUserDTO findById(String id) {
        return webClient
                .get()
                .uri(String.join("", "/master/agent/by-id?id=", id))
                .retrieve()
                .bodyToMono(MobileUserDTO.class).block();
    }

//    public MobileUser findByIdName(String id) {
//        return webClient
//                .get()
//                .uri(String.join("", "/master/agent/by-id?id=", id))
//                .retrieve()
//                .bodyToMono(MobileUser.class).block();
//    }
//
    public MobileUserDTO save(MobileUserDTO mobileUser) {
        return webClient.post()
                .uri( "/master/agent/save").body(Mono.just(mobileUser),MobileUserDTO.class)
                .retrieve()
                .bodyToMono(MobileUserDTO.class).block();
//        MultiValueMap<String, String> bodyValues = new LinkedMultiValueMap<>();
//        bodyValues.add(mobileUser.getId(),mobileUser.getBalance().toString());
//
//        return webClient.post()
//                .uri("http://localhost:8111/", "/master/agent/save")
//                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
//                .accept(MediaType.APPLICATION_JSON)
//                .body(BodyInserters.fromFormData(bodyValues))
//                .retrieve()
//                .bodyToMono(MobileUserDTO.class)
//                .block();
    }
}
