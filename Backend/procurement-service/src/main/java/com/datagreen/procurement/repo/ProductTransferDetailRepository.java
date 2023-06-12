package com.datagreen.procurement.repo;

import com.datagreen.procurement.domain.ProductTransferDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTransferDetailRepository extends JpaRepository<ProductTransferDetail, String> {
    ProductTransferDetail findByNetWeight(Double netWeight);
}
