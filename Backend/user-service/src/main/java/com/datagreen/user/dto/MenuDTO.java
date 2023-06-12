package com.datagreen.user.dto;

import lombok.Data;

import java.util.Map;

@Data
public class MenuDTO {
    private String id;
    private String name;
    private Map<String, Boolean> scopes;
}
