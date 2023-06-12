package com.datagreen.report.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@Entity
public class DatagreenReportConfig extends AuditableBase{
    private String name;

    @Column(columnDefinition = "text")
    private String query;

    @Column(columnDefinition = "text")
    private String detailQuery;

    private Boolean isActive;
}
