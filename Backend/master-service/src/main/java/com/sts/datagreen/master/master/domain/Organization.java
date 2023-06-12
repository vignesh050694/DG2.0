package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "organization")
@Where(clause = "is_deleted = false")
public class Organization extends AuditableBase {
    private String organizationId;
    private String name;
    private String contactPerson;
    private String contactNumber;
    private String address;
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
