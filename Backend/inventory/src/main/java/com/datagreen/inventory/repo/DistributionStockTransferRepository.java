package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.DistributionStockTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface DistributionStockTransferRepository extends JpaRepository<DistributionStockTransfer, String>, JpaSpecificationExecutor<DistributionStockTransfer> {

    DistributionStockTransfer findByTruckId(String truckId);
    List<DistributionStockTransfer> findAllById(String ids);
    Optional<DistributionStockTransfer> findByReceiptNumber(String receiptNumber);

  List<DistributionStockTransfer> findByReceiverWarehouse(String warehouse);
}
