package com.datagreen.user.service.impl;

import com.datagreen.user.configuration.KeycloakToken;
import com.datagreen.user.dto.KeycloakConfig;
import com.datagreen.user.dto.LoginDTO;
import com.datagreen.user.exception.CustomException;
import com.datagreen.user.repository.MenuRepository;
import com.datagreen.user.repository.UserRepository;
import com.datagreen.user.service.LoginService;
import com.datagreen.user.util.KeycloakConfigProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public Map<String, String> getToken(LoginDTO user, HttpServletRequest request) throws IOException, CustomException {
        String realm = request.getHeader("realm");
        KeycloakConfigProperties keycloakConfigProperties = new KeycloakConfigProperties();
        KeycloakConfig keycloakConfig =  keycloakConfigProperties.getKeycloakConfig(realm);
        KeycloakToken keycloakToken = new KeycloakToken(keycloakConfig.getAuthServerUrl(), keycloakConfig.getResource(), keycloakConfig.getCredentials().getSecret(), realm);
        return keycloakToken.getUserToken(user);
    }

}
