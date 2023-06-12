package com.datagreen.procurement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datagreen.procurement.domain.ProductReceptionDetail;


@Repository
public interface ProductReceptionDetailRepository extends JpaRepository<ProductReceptionDetail, String>{

}
