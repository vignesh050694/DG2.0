package com.datagreen.user.dao;

import com.datagreen.user.domain.Menu;
import com.datagreen.user.dto.pagination.SearchCriteria;

import java.util.List;
import java.util.Optional;

public interface MenuDAO {
    List<Menu> getMenus(List<SearchCriteria> criteria);

    Optional<Menu> findById(String id);

    void save(Menu menu);
}
