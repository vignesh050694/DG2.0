package com.datagreen.user.configuration;

import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.KeycloakDeploymentBuilder;
import org.keycloak.adapters.OIDCHttpFacade;
import org.keycloak.representations.adapters.config.AdapterConfig;

import java.io.InputStream;
import java.util.concurrent.ConcurrentHashMap;

public class HeaderBasedConfigResolver implements KeycloakConfigResolver {

    private final ConcurrentHashMap<String, KeycloakDeployment> cache = new ConcurrentHashMap<>();

    private static AdapterConfig adapterConfig;

    @Override
    public KeycloakDeployment resolve(OIDCHttpFacade.Request request) {
        if(!request.getMethod().equals("OPTIONS")) {
            String realm = request.getHeader("realm");
            if (realm == null) {
                realm="datagreen";
            }
            if (!cache.containsKey(realm)) {
                InputStream is = getClass().getResourceAsStream("/" + realm + "-keycloak.json");
                cache.put(realm, KeycloakDeploymentBuilder.build(is));
            }
            return cache.get(realm);
        }

        return new KeycloakDeployment();
    }

    static void setAdapterConfig(AdapterConfig adapterConfig) {
        HeaderBasedConfigResolver.adapterConfig = adapterConfig;
    }
}