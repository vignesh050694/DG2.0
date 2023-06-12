package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;


@Data
public class DistributionStockReceptionDTO {

    private String id;
    private BasicDTO season;
    private WarehouseDTO receiverWarehouse;
    private String receiptNumber;
    private String transferReceiptNumber;
    private String date;
    private String truckId;
    private String driverName;

    private List<DistributionStockReceptionDetailDTO> distributionStockReceptionDetails;
}
