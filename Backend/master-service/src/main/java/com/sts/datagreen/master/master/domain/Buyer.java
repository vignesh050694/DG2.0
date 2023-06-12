package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name="buyer")
@Where(clause = "is_deleted = false")
public class Buyer extends AuditableBase{
    private String code;
    private String name;
    private String contactPerson;
    private String contactNo;
    private String email;
}
