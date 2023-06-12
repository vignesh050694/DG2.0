package com.datagreen.user.dao.impl;

import com.datagreen.user.dao.MenuDAO;
import com.datagreen.user.domain.Menu;
import com.datagreen.user.dto.pagination.SearchCriteria;
import com.datagreen.user.repository.MenuRepository;
import com.datagreen.user.specification.MenuSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class MenuDAOImpl implements MenuDAO {
    @Autowired
    private MenuRepository menuRepository;

    @Override
    public List<Menu> getMenus(List<SearchCriteria> criteria) {
        return menuRepository.findAll(getSpecifications(criteria));
    }

    @Override
    public Optional<Menu> findById(String id) {
        return menuRepository.findById(id);
    }

    @Override
    public void save(Menu menu) {
        menuRepository.save(menu);
    }

    private Specification<Menu> getSpecifications(List<SearchCriteria> criteria) {
        if (criteria.size() == 0) {
            return null;
        }
        List<Specification<Menu>> specs = criteria.stream()
                .map(MenuSpecification::new)
                .collect(Collectors.toList());

        Specification<Menu> result = specs.get(0);

        for (int i = 1; i < criteria.size(); i++) {
            result = getMenuSpecification(criteria, specs, result, i);
        }

        return result;
    }

    private Specification<Menu> getMenuSpecification(List<SearchCriteria> criteria, List<Specification<Menu>> specs, Specification<Menu> result, int i) {
        result = criteria.get(i)
                .isOrPredicate()
                ? Specification.where(result)
                .or(specs.get(i))
                : Specification.where(result)
                .and(specs.get(i));
        return result;
    }
}
