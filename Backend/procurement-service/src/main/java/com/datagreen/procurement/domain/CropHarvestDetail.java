package com.datagreen.procurement.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@Entity
public class CropHarvestDetail extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "cropHarvest_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private CropHarvest cropHarvest;

    private Date sowingDate;
    private String grade;
    private Double quantity;
}
