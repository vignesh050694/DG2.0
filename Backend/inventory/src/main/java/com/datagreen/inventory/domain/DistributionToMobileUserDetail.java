package com.datagreen.inventory.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
public class DistributionToMobileUserDetail extends IdentifiableBase {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "distribution_to_mobile_user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JsonBackReference
    private DistributionToMobileUser distributionToMobileUser;

    private String category;
    private String product;
    private Double availableStock;
    private String batchNo;
    private Double distributionQuantity;

}
