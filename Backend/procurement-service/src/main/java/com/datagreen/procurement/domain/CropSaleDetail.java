package com.datagreen.procurement.domain;

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
public class CropSaleDetail extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cropSale_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JsonBackReference
    private CropSale cropSale;

    private int cropType;
    private String grade;
    private String batchNo;
    private Double quantity;
}
