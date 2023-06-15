package com.datagreen.user.service;

import com.datagreen.user.dto.LoginDTO;
import com.datagreen.user.exception.CustomException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

public interface LoginService {

    Map<String, String> getToken(LoginDTO user, HttpServletRequest request) throws IOException, CustomException;
}
