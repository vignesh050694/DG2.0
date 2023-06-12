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
public class DistributionStockTransfer extends AuditableBase{
    private Date date;
    private String receiptNumber;
    private String season;
    private String senderWarehouse;
    private String receiverWarehouse;
    private String truckId;
    private String driverName;

    @OneToMany(mappedBy = "distributionStockTransfer")
    private List<DistributionStockTransferDetail> distributionStockTransferDetails;

}
