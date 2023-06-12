package com.datagreen.inventory.domain;


import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class WarehouseStockEntry extends AuditableBase{

    private Date date;
    private String invoice;
    private String season;
    private String warehouse;
    private String vendor;

    @OneToMany(mappedBy = "warehouseStock")
    private List<WarehouseStockEntryDetail> warehouseStockDetails;
}
