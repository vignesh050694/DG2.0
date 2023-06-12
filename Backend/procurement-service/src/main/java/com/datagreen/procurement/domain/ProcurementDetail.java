package com.datagreen.procurement.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
public class ProcurementDetail extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "procurement_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Procurement procurement;
    private String grade;
    private Double noOfBags;
    private Double netWeight;
}
