package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, String>, JpaSpecificationExecutor<Group> {
    List<Group> findAll();

    List<Group> findAllById(String ids);

    Group findByName(String name);

    List<Group> findByRevisionNoGreaterThan(Long groupRevNo);
}