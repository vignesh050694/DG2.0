package com.datagreen.user.configuration;

import com.datagreen.user.dto.LoginDTO;
import com.datagreen.user.exception.CustomException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

public class KeycloakToken {

    public static final String APPLICATION_X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded";
    public static final String POST = "POST";
    public static final String CONTENT_TYPE = "Content-Type";
    public static final String ACCESS_TOKEN = "access_token";
    public static final String REFRESH_TOKEN = "refresh_token";

    private String authServerUrl;

    private String clientId;

    private String secret;

    private String realm;

    public KeycloakToken(String authServerUrl, String clientId, String secret, String realm) {
        this.authServerUrl = authServerUrl;
        this.clientId = clientId;
        this.secret = secret;
        this.realm = realm;
    }

    public Map<String, String> getUserToken(LoginDTO userDTO) throws IOException, CustomException {
        Map<String, String> tokenResponse = new LinkedHashMap<>();
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        String requestBuilder = "grant_type=password&client_id=" +
                clientId +
                "&client_secret=" +
                secret +
                "&username=" +
                userDTO.getUserName() +
                "&password=" +
                userDTO.getPassword() +
                "&scope=openid offline_access";

        MediaType mediaType = MediaType.parse(APPLICATION_X_WWW_FORM_URLENCODED);
        RequestBody body = RequestBody.create(requestBuilder, mediaType);
        Request request = new Request.Builder()
                .url(getTokenUrl())
                .method(POST, body)
                .addHeader(CONTENT_TYPE, APPLICATION_X_WWW_FORM_URLENCODED)
                .build();
        Response response = client.newCall(request).execute();

        if(response.isSuccessful()) {
            assert response.body() != null;
            String responseStr = response.body().string();
            JsonObject jsonObject = JsonParser.parseString(responseStr).getAsJsonObject();
            tokenResponse.put("token",jsonObject.get(ACCESS_TOKEN).getAsString());
            tokenResponse.put("refresh-token", jsonObject.get(REFRESH_TOKEN).getAsString());
            response.close();
        }else{
            throw new UnauthorisedException("Invalid username or password", "Wrong credentials");
        }
        return  tokenResponse;
    }

    public Map<String, String> getRefreshToken(String refreshToken) throws IOException {
        Map<String, String> tokenResponse = new LinkedHashMap<>();
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse(APPLICATION_X_WWW_FORM_URLENCODED);

        String requestBuilder = "grant_type=refresh_token&client_id=" +
                clientId +
                "&client_secret=" +
                secret +
                "&scope=openid offline_access" +
                "&refresh_token=" +
                refreshToken;

        RequestBody body = RequestBody.create(mediaType, requestBuilder);
        Request request = new Request.Builder()
                .url(getTokenUrl())
                .method(POST, body)
                .addHeader(CONTENT_TYPE, APPLICATION_X_WWW_FORM_URLENCODED)
                .build();

        Response response = client.newCall(request).execute();
        String responseStr = Objects.requireNonNull(response.body()).string();
        try{
            if(response.isSuccessful()) {
                JsonObject jsonObject = JsonParser.parseString(responseStr).getAsJsonObject();
                tokenResponse.put("token",jsonObject.get(ACCESS_TOKEN).getAsString());
                tokenResponse.put("refresh-token", jsonObject.get(REFRESH_TOKEN).getAsString());
            }
        }finally {
            response.close();
        }
        return  tokenResponse;
    }

    private  String getTokenUrl(){
        return this.authServerUrl + "realms/" + this.realm + "/protocol/openid-connect/token";
    }

}
