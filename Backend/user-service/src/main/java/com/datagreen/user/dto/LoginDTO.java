package com.datagreen.user.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String userName;
    private String password;
    private String refreshToken;
}
