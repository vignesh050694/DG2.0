package com.datagreen.user.controller;

import com.datagreen.user.domain.User;
import com.datagreen.user.dto.LoginDTO;
import com.datagreen.user.dto.MenuResponseDTO;
import com.datagreen.user.exception.CustomException;
import com.datagreen.user.service.LoginService;
import com.datagreen.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private LoginService loginService;

    @GetMapping("/menu")
    public ResponseEntity<List<MenuResponseDTO>> checkLogin(HttpServletRequest request) throws CustomException {
        return new ResponseEntity<>(userService.getLogin(request), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> getAccessToken(@RequestBody LoginDTO user, HttpServletRequest httpServletRequest)  {
        return ResponseEntity.ok(loginService.getToken(user, httpServletRequest));
    }
}
