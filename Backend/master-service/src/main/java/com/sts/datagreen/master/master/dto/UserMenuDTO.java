package com.sts.datagreen.master.master.dto;

public interface UserMenuDTO {
    String getMenuId();
    String getTitle();
    String getLink();

    String getParent();
    Integer getRank();
}
