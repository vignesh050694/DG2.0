package com.datagreen.user.dto;

import lombok.Data;

@Data
public class RoleDTO extends IdentifiableDTO{
    private String name;
    private Boolean isAdmin;
}
