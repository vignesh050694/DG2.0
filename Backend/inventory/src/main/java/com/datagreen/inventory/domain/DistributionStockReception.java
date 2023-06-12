package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class DistributionStockReception extends AuditableBase{

    private String season;
    private String receiverWarehouse;
    private String transferReceiptNumber;
    private String receiptNumber;
    private Date date;
    private String truckId;
    private String driverName;

    @OneToMany(mappedBy = "distributionStockReception")
    private List<DistributionStockReceptionDetail> distributionStockReceptionDetails;
}
