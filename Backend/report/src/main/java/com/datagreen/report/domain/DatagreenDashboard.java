package com.datagreen.report.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@Entity
public class DatagreenDashboard extends AuditableBase{
    private String type;

    @Column(columnDefinition = "text")
    private String query;

}
