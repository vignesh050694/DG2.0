package com.datagreen.inventory.dao.impl;

import com.datagreen.inventory.dao.DistributionTransferDAO;
import com.datagreen.inventory.domain.DistributionStockTransfer;
import com.datagreen.inventory.repo.DistributionStockTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class DistributionTransferDAOImpl implements DistributionTransferDAO {
  @Autowired
  private DistributionStockTransferRepository distributionStockTransferRepository;

  @Override
  public List<String> getAllReceipts(String warehouse) {
    return distributionStockTransferRepository.findByReceiverWarehouse(warehouse).stream().map(DistributionStockTransfer:: getReceiptNumber).collect(Collectors.toList());
  }
}
