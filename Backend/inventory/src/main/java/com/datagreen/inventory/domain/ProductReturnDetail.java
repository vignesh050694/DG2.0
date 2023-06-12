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
public class ProductReturnDetail extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productReturn_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JsonBackReference
    private ProductReturn productReturn;

    private String subCategory;
    private String productName;
    private Double quantity;
}
