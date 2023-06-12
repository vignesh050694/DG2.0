package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "equipment")
public class FarmEquipment extends IdentifiableBase{

    private String vehicleType;
    private Integer vehicleCount;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "farmer", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Farmer farmer;
}
