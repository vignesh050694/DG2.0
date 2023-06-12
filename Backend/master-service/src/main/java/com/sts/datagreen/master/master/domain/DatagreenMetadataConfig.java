package com.sts.datagreen.master.master.domain;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class DatagreenMetadataConfig extends AuditableBase{
    private String name;
    private String configuration;
    private Boolean isActive;
}
