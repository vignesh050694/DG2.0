package com.datagreen.user.service.impl;

import com.datagreen.user.dao.RoleDAO;
import com.datagreen.user.domain.Menu;
import com.datagreen.user.domain.Role;
import com.datagreen.user.domain.RoleMenu;
import com.datagreen.user.domain.Scopes;
import com.datagreen.user.domain.User;
import com.datagreen.user.dto.MenuDTO;
import com.datagreen.user.dto.RoleDTO;
import com.datagreen.user.dto.RoleMenuDTO;
import com.datagreen.user.dto.pagination.PaginationDTO;
import com.datagreen.user.dto.pagination.SearchCriteria;
import com.datagreen.user.dto.pagination.TableResponse;
import com.datagreen.user.repository.RoleMenuRepository;
import com.datagreen.user.repository.ScopeRepository;
import com.datagreen.user.service.MenuService;
import com.datagreen.user.service.RoleService;
import com.datagreen.user.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private MenuService menuService;

    @Autowired
    private RoleDAO roleDAO;

    @Autowired
    private ScopeRepository scopeRepository;

    @Autowired
    private RoleMenuRepository roleMenuRepository;

    @Override
    public RoleMenuDTO getMenuByParent(List<String> parent, String role) {
        List<Menu> menus = menuService.getMenus(getFilter(Collections.singletonList(parent)));
        RoleMenuDTO roleMenu = new RoleMenuDTO();
        roleMenu.setRole(new RoleDTO());
        List<MenuDTO> roleMenus = collectMenuScopes(menus, role);
        roleMenu.setMenus(roleMenus);
        return roleMenu;
    }

    @Override
    public List<Role> getRole() {
        List<Role> roleList = roleDAO.findAll();
        return roleList.stream().map(user -> Mapper.map(user, Role.class)).collect(Collectors.toList());
    }

    @Override
    public RoleMenuDTO saveRole(RoleMenuDTO roleMenu) {
        Role role = Mapper.map(roleMenu.getRole(), Role.class);
        Mapper.setAuditable(role);
        roleDAO.saveRole(role);
        roleMenu.setRole(Mapper.map(role, RoleDTO.class));

        List<RoleMenu> roleMenus = new ArrayList<>();
        for(MenuDTO menuDTO : roleMenu.getMenus()){
            Menu menu = menuService.findById(menuDTO.getId());
            menuDTO.getScopes().entrySet().forEach(entry->{
                if(entry.getValue()){
                    Optional<Scopes> scopesOptional =  scopeRepository.findById(entry.getKey());
                    if(scopesOptional.isPresent()){
                        RoleMenu menuScope = new RoleMenu();
                        menuScope.setRole(role);
                        menuScope.setMenu(menu);
                        menuScope.setScope(scopesOptional.get());
                        roleMenus.add(menuScope);
                    }
                }
            });
        }

        roleMenuRepository.saveAll(roleMenus);
        return roleMenu;
    }

    @Override
    public TableResponse getRoles(PaginationDTO pagination) {
        Page<Role> rolePaged = roleDAO.getRoles(pagination);
        TableResponse response;
        if (rolePaged.hasContent()) {
            response = new TableResponse(0, (int) rolePaged.getTotalElements(), (int) rolePaged.getTotalElements(),
                    rolePaged.getContent());

        } else {
            response = new TableResponse(0, (int) rolePaged.getTotalElements(), (int) rolePaged.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private List<SearchCriteria> getFilter(List<Object> parent) {
        SearchCriteria searchCriteria = new SearchCriteria("parent.id", ":", null);
        searchCriteria.setValues(parent);
        List<SearchCriteria> criteriaList = new ArrayList<>();
        criteriaList.add(searchCriteria);
        return criteriaList;
    }

    private List<MenuDTO> collectMenuScopes(List<Menu> menus, String role) {
        return menus.stream().map(menu -> getMenuDTO(menu, role)).collect(Collectors.toList());
    }

    private MenuDTO getMenuDTO(Menu menu, String roleId) {
        Role role = null;
        Set<String> eScopes = new HashSet<>();
        if(StringUtils.hasLength(roleId)){
            Optional<Role> roleOptional = roleDAO.findById(roleId);
            role = roleOptional.orElse(null);
            eScopes = role.getMenus().stream().map(eMenu -> eMenu.getMenu().getId()+"."+eMenu.getScope().getId()).collect(Collectors.toSet());
        }
        MenuDTO menuDTO = new MenuDTO();
        menuDTO.setId(menu.getId());
        menuDTO.setName(menu.getTitle());
        Map<String, Boolean> scopeMap = new HashMap<>();
        for (Scopes scopes : menu.getScopes()) {
            String eScope = menu.getId()+"."+scopes.getId();
            if(eScopes.contains(eScope)){
                scopeMap.put(scopes.getId(), true);
            }else {
                scopeMap.put(scopes.getId(), false);
            }
        }
        menuDTO.setScopes(scopeMap);
        return menuDTO;
    }
}
