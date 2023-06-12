package com.datagreen.user.service;

import com.datagreen.user.domain.Menu;
import com.datagreen.user.dto.pagination.SearchCriteria;

import java.util.List;

public interface MenuService {
    List<Menu> getMenus(List<SearchCriteria> criteria);

    Menu findById(String id);

    void saveMenu(Menu menu);
}
