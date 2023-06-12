package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.ProductReturn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReturnRepository extends JpaRepository<ProductReturn , String> {

}
