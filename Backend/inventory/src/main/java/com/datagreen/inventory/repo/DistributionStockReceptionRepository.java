package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionStockReception;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface DistributionStockReceptionRepository extends JpaRepository<DistributionStockReception, String>, JpaSpecificationExecutor<DistributionStockReception> {

    List<DistributionStockReception> findAllById(String ids);

    DistributionStockReception findByReceiptNumber(String receiptNumber);
}
