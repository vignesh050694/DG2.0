package com.datagreen.procurement.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductTransferDTO {

    private String id;
    private String receipt;
    private BasicDTO senderWarehouse;
    private BasicDTO receiverWarehouse;
    private BasicDTO season;
    private String driverName;
    private String truckId;
    private String transferDateStr;
    private List<ProductTransferDetailDTO> productTransferDetails;
}

