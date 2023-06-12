package com.datagreen.procurement.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class ProcurementStock extends AuditableBase{
    private String warehouse;
    private String grade;
    private Double noOfBags;
    private Double netWeight;
}
