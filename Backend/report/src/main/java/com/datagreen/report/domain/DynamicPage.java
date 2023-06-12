package com.datagreen.report.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Data
public class DynamicPage extends AuditableBase{
    @Column(columnDefinition = "text")
    private String config;
    private String mainTable;
}
