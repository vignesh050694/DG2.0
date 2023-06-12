package com.datagreen.procurement.domain;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class ProductReception extends AuditableBase{
	@SequenceGenerator(name="seq",sequenceName="receptionReceipt_seq", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="seq")
    private String receptionReceipt;
	private Date productReceptionDate;
    private String receiverWarehouse;
    private String driverName;
    private String truckId;

    @OneToMany(mappedBy = "productReception")
    private List<ProductReceptionDetail> productReceptionDetail;
}
