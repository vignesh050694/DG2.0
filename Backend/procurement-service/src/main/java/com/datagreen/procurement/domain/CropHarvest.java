package com.datagreen.procurement.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "crop_harvest")
@Where(clause = "is_deleted = false")
public class CropHarvest extends AuditableBase {
    private Date date;
    private String farm;
    private String farmer;
    private String village;

    @OneToMany(mappedBy = "cropHarvest")
    private List<CropHarvestDetail> cropHarvestDetails;
}