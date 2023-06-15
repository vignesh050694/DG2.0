package com.datagreen.user.service.impl;

import com.datagreen.user.configuration.KeycloakToken;
import com.datagreen.user.domain.Agent;
import com.datagreen.user.domain.User;
import com.datagreen.user.dto.KeycloakConfig;
import com.datagreen.user.dto.LoginDTO;
import com.datagreen.user.exception.CustomException;
import com.datagreen.user.service.KeycloakUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Value("${authUser}")
    private String authUser;

    @Value("${authPassword}")
    private String authPassword;


    @Override
    public String createUser(User user, KeycloakConfig keycloakConfig) throws IOException, CustomException {
        UserRepresentation kcUser = new UserRepresentation();

        List<String> roles = new ArrayList<>();
        if(!CollectionUtils.isEmpty(user.getRoles())) {
            roles.addAll(user.getRoles());
        }

        CredentialRepresentation credentialRepresentation = createPasswordCredentials(user.getPassword());

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUserName(authUser);
        loginDTO.setPassword(authPassword);

        KeycloakToken keycloakToken = new KeycloakToken(keycloakConfig.getAuthServerUrl(),keycloakConfig.getResource(),keycloakConfig.getCredentials().getSecret(), keycloakConfig.getRealm());
        Map<String, String> tokenMap = keycloakToken.getUserToken(loginDTO);
        if (tokenMap.containsKey("token")){
            String token = tokenMap.get("token");

            kcUser.setUsername(user.getUserName());
            kcUser.setCredentials(Collections.singletonList(credentialRepresentation));
            kcUser.setFirstName(user.getName());
            kcUser.setEmail(user.getEmail());
            kcUser.setEnabled(true);
            kcUser.setEmailVerified(false);
            kcUser.setRealmRoles(roles);
            kcUser.setLastName(user.getLastName());
            kcUser.setRealmRoles(roles);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.set("Authorization", "Bearer " + token);

            HttpEntity<String> postEntity = new HttpEntity<>(new ObjectMapper().writeValueAsString(kcUser), headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> responseEntityStr = restTemplate.exchange(getCreateUserUrl(keycloakConfig), HttpMethod.POST, postEntity, String.class);

            if (responseEntityStr.getStatusCode().value() != 201) {
                throw  new CustomException(responseEntityStr.getBody());
            }

        }

        return null;
    }

    @Override
    public String createAgent(Agent agent, KeycloakConfig keycloakConfig) throws IOException, CustomException {
        UserRepresentation kcUser = new UserRepresentation();

        List<String> roles = new ArrayList<>();

        CredentialRepresentation credentialRepresentation = createPasswordCredentials(agent.getPassword());

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUserName(authUser);
        loginDTO.setPassword(authPassword);

        KeycloakToken keycloakToken = new KeycloakToken(keycloakConfig.getAuthServerUrl(),keycloakConfig.getResource(),keycloakConfig.getCredentials().getSecret(), keycloakConfig.getRealm());
        Map<String, String> tokenMap = keycloakToken.getUserToken(loginDTO);
        if (tokenMap.containsKey("token")){
            String token = tokenMap.get("token");

            kcUser.setUsername(agent.getUserName());
            kcUser.setCredentials(Collections.singletonList(credentialRepresentation));
            kcUser.setFirstName(agent.getFirstName() + " " + agent.getLastName());
            kcUser.setEmail(agent.getEmail());
            kcUser.setEnabled(true);
            kcUser.setEmailVerified(false);
            kcUser.setRealmRoles(roles);
            kcUser.setLastName(agent.getLastName());
            kcUser.setRealmRoles(roles);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.set("Authorization", "Bearer " + token);

            HttpEntity<String> postEntity = new HttpEntity<>(new ObjectMapper().writeValueAsString(kcUser), headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> responseEntityStr = restTemplate.exchange(getCreateUserUrl(keycloakConfig), HttpMethod.POST, postEntity, String.class);

            if (responseEntityStr.getStatusCode().value() != 201) {
                throw  new CustomException(responseEntityStr.getBody());
            }

        }

        return null;
    }

    private CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }

    private String getCreateUserUrl(KeycloakConfig keycloakConfig) {
        return keycloakConfig.getAuthServerUrl() + "admin/realms/" + keycloakConfig.getRealm() + "/users";
    }
}
