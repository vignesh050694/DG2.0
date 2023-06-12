package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.dto.MenuResponseDTO;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user")
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/menu")
    public ResponseEntity<List<MenuResponseDTO>> checkLogin(HttpServletRequest request) throws CustomException {
        return new ResponseEntity<>(userService.getLogin(request), HttpStatus.OK);
    }
}
