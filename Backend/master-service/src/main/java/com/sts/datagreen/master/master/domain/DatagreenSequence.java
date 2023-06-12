package com.sts.datagreen.master.master.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@Entity
public class DatagreenSequence extends IdentifiableBase{
    @Column(unique = true)
    private String name;
    private Integer sequence;
}
