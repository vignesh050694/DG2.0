package com.datagreen.user.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoleMenuDTO {
    private RoleDTO role;
    private List<MenuDTO> menus;
}
