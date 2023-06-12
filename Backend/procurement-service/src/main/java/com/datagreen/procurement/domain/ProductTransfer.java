package com.datagreen.procurement.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class ProductTransfer extends AuditableBase{

    @SequenceGenerator(name="seq",sequenceName="receipt_seq", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="seq")
    private String receipt;
    @Temporal(TemporalType.DATE)
    private Date transferDate;
    private String senderWarehouse;
    private String receiverWarehouse;
    private String product;
    private String driverName;
    private String truckId;
    private String batchNum;
    private String season;

    @OneToMany(mappedBy = "productTransfer")
    private List<ProductTransferDetail> productTransferDetails;
}
