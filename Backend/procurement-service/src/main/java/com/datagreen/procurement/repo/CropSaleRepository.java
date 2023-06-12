package com.datagreen.procurement.repo;


import com.datagreen.procurement.domain.CropSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CropSaleRepository extends JpaRepository<CropSale, String>, JpaSpecificationExecutor<CropSale> {

}
