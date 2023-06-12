package com.datagreen.user.service.impl;

import com.datagreen.user.dao.MenuDAO;
import com.datagreen.user.domain.Menu;
import com.datagreen.user.domain.Scopes;
import com.datagreen.user.dto.pagination.SearchCriteria;
import com.datagreen.user.repository.ScopeRepository;
import com.datagreen.user.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.function.Function;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements MenuService {
    @Autowired
    private MenuDAO menuDAO;

    @Autowired
    private ScopeRepository scopeRepository;

    @Override
    public List<Menu> getMenus(List<SearchCriteria> criteria) {
        return menuDAO.getMenus(criteria);
    }

    @Override
    public Menu findById(String id) {
        Optional<Menu> menuOptional = menuDAO.findById(id);
        return menuOptional.orElse(null);
    }

    @Override
    public void saveMenu(Menu menu) {
        List<Scopes> scopeList = scopeRepository.findAll();
        Map<String, Scopes> map1 = scopeList.stream().collect(Collectors.toMap(Scopes::getId, Function.identity()));
       for(Scopes scope:menu.getScopes()){
           if(map1.get(scope.getId())==null){
               scopeRepository.save(scope);
           }
       }
        menuDAO.save(menu);
    }

}
