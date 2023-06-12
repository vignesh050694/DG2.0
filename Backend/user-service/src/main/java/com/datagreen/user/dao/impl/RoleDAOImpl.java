package com.datagreen.user.dao.impl;

import com.datagreen.user.dao.RoleDAO;
import com.datagreen.user.domain.Role;
import com.datagreen.user.dto.pagination.PaginationDTO;
import com.datagreen.user.dto.pagination.SearchCriteria;
import com.datagreen.user.repository.RoleRepository;
import com.datagreen.user.specification.RoleSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class RoleDAOImpl implements RoleDAO {
    @Autowired
    private RoleRepository roleRepository;


    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Page<Role> getRoles(PaginationDTO pagination) {
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        return roleRepository.findAll(getSpecifications(pagination), paging);
    }

    @Override
    public Optional<Role> findById(String roleId) {
        return roleRepository.findById(roleId);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    private Specification<Role> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<Role>> specs = params.stream()
                .map(RoleSpecification::new)
                .collect(Collectors.toList());

        Specification<Role> result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = getResult(params, specs, result, i);
        }

        return result;
    }

    private Specification<Role> getResult(List<SearchCriteria> params, List<Specification<Role>> specs, Specification<Role> result, int i) {
        return params.get(i)
                .isOrPredicate()
                ? Specification.where(result)
                .or(specs.get(i))
                : Specification.where(result)
                .and(specs.get(i));
    }
}
