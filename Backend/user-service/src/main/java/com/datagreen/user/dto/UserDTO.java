package com.datagreen.user.dto;

import com.datagreen.user.domain.Role;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class UserDTO {
    private String id;
    private String name;
    private String subOrganization;
    private String firstName;
    private String lastName;
    private String mobileNo;
    private Boolean isActive;
    private String email;
    private Role role;
    private String userName;
    private String password;
    private String photo;
    private List<String> roles;
}
