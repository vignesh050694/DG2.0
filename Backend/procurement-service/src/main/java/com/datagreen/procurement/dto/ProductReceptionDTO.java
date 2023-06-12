package com.datagreen.procurement.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class ProductReceptionDTO {
    private String id;
	private String receptionReceipt;
	private String productReceptionDate;
	private WarehouseDTO receiverWarehouse;
    private String driverName;
    private String truckId;
    private List<ProductReceptionDetailDTO> productReceptionDetails;
}
