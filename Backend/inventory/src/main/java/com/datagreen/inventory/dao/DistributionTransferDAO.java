package com.datagreen.inventory.dao;

import java.util.List;

public interface DistributionTransferDAO {
  List<String> getAllReceipts(String warehouse);
}
