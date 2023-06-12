package com.datagreen.user.dto;

public interface UserMenuDTO {
    String getMenuId();
    String getTitle();
    String getLink();

    String getParent();
    Integer getRank();
}
