package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.ProductReturnMobileUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductReturnMobileUserRepository extends JpaRepository<ProductReturnMobileUser, String>, JpaSpecificationExecutor<ProductReturnMobileUser> {
}
