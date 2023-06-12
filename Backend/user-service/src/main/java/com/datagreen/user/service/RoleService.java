package com.datagreen.user.service;

import com.datagreen.user.domain.Role;
import com.datagreen.user.dto.RoleMenuDTO;
import com.datagreen.user.dto.pagination.PaginationDTO;
import com.datagreen.user.dto.pagination.TableResponse;

import java.util.List;

public interface RoleService {
     RoleMenuDTO getMenuByParent(List<String> parent, String role);

     RoleMenuDTO saveRole(RoleMenuDTO roleMenu);

     TableResponse getRoles(PaginationDTO pagination);

     List<Role> getRole();
}
