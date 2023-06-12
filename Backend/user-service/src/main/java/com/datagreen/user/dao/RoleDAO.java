package com.datagreen.user.dao;

import com.datagreen.user.domain.Role;
import com.datagreen.user.dto.pagination.PaginationDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface RoleDAO {
    Role saveRole(Role role);

    Page<Role> getRoles(PaginationDTO pagination);

    Optional<Role> findById(String roleId);

    List<Role> findAll();
}
