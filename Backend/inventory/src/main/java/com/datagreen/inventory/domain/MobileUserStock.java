package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

@Data
@Entity
public class MobileUserStock extends AuditableBase {
    private String product;
    private Double quantity;
    private Double noOfBags;
    private String mobileUser;
}
