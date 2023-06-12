package com.datagreen.procurement.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.datagreen.procurement.domain.ProductReception;

@Repository
public interface ProductReceptionRepository extends JpaRepository<ProductReception, String>, JpaSpecificationExecutor<ProductReception> {

	List<ProductReception> findAllById(String ids);

	ProductReception findByTruckId(String truckId);
	
	ProductReception findByReceptionReceipt(String receipt);
}
