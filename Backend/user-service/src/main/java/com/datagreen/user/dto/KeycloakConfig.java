package com.datagreen.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KeycloakConfig {
    private String realm;
    private String resource;
    @JsonProperty("auth-server-url")
    private String authServerUrl;
    private Credentials credentials;
}
