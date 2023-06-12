package com.datagreen.farmer.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "farmer_balance")
public class FarmerBalance extends IdentifiableBase{
    private String farmer;
    private Double remainingBalance;
}
