package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "vendor")
@Where(clause = "is_deleted = false")
public class Vendor extends AuditableBase {
    private String name;
    private String address;
    private String contactPerson;
    private String contactNumber;
    private String emailId;
}
