package com.datagreen.user.service;

import com.datagreen.user.domain.Agent;
import com.datagreen.user.domain.User;
import com.datagreen.user.dto.KeycloakConfig;
import com.datagreen.user.exception.CustomException;

import java.io.IOException;

public interface KeycloakUserService {
    String createUser(User user, KeycloakConfig keycloakConfig) throws IOException, CustomException;

    String createAgent(Agent agent, KeycloakConfig keycloakConfig) throws IOException, CustomException;
}
