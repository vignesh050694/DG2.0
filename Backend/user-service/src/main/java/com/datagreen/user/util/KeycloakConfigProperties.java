package com.datagreen.user.util;

import com.datagreen.user.dto.KeycloakConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

public class KeycloakConfigProperties {
    public KeycloakConfig getKeycloakConfig(String realm) throws IOException {
        if (realm == null) {
            realm = "datagreen";
        }
        InputStream is = getClass().getResourceAsStream("/" + realm + "-keycloak.json");
        String result = IOUtils.toString(Objects.requireNonNull(is), StandardCharsets.UTF_8);
        ObjectMapper objectMapper = new ObjectMapper();
        KeycloakConfig keycloakConfig = objectMapper.readValue(result, KeycloakConfig.class);
        return keycloakConfig;

    }

}
