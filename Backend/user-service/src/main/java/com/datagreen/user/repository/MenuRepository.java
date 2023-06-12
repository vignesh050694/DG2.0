package com.datagreen.user.repository;

import com.datagreen.user.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, String>, JpaSpecificationExecutor<Menu> {
    List<Menu> findByParentIdIsNullOrderByRankAsc();

    List<Menu> findByParentIdOrderByRankAsc(String parent);
}
