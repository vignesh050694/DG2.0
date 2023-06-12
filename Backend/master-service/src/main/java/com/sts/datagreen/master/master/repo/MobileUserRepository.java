package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.MobileUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface MobileUserRepository extends JpaRepository<MobileUser, String>, JpaSpecificationExecutor<MobileUser> {
    MobileUser findByName(String name);
    List<MobileUser> findAllById(String ids);
}
