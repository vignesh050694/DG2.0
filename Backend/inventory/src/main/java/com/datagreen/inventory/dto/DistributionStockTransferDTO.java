package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DistributionStockTransferDTO {
    private String id;
    private String date;
    private String receiptNumber;
    private BasicDTO season;
    private BasicDTO senderWarehouse;
    private BasicDTO receiverWarehouse;
    private String truckId;
    private String driverName;
    private List<DistributionStockTransferDetailDTO> distributionStockTransferDetails;

}
