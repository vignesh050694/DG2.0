package com.datagreen.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class MenuResponseDTO {
    private String title;
    private String id;
    private String activeIcon;
    private String icon;
    private String link;
    private Integer rank;
    private List<MenuResponseDTO> child;
}
