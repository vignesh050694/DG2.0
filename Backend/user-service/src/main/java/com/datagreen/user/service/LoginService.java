package com.datagreen.user.service;

import com.datagreen.user.dto.LoginDTO;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface LoginService {

    Map<String, String> getToken(LoginDTO user, HttpServletRequest request);
}
