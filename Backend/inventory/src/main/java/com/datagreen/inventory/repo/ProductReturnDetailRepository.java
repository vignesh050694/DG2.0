package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.ProductReturnDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReturnDetailRepository extends JpaRepository<ProductReturnDetail , String> {

}
