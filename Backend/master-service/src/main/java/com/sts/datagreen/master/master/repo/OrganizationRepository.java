package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Organization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;

public interface OrganizationRepository extends JpaRepository<Organization, String>, JpaSpecificationExecutor<Organization> {
    List<Organization> findAll();
    Organization findByName(String name);
    Organization findAllById(String ids);

}