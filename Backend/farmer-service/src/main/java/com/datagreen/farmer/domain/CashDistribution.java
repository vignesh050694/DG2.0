package com.datagreen.farmer.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Table(name="cash_distribution")
@Entity
public class CashDistribution extends AuditableBase{

    private String mobileUserId;
    private String mobileUser;
    private Double balance;

}
