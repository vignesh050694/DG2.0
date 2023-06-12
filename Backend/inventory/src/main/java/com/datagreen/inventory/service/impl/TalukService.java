package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.dto.TalukDTO;
import com.datagreen.inventory.dto.VillageDTO;
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

  public TalukDTO findById(String id){
    return webClient
      .get()
      .uri(String.join("", "/master/taluk/by-id?id=", id))
      .retrieve()
      .bodyToMono(TalukDTO.class).block();
  }
}
