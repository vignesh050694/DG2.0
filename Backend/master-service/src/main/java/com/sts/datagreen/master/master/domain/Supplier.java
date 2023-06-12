package com.sts.datagreen.master.master.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Data
@Entity
@Table(name = "supplier")
public class Supplier extends AuditableBase {
    private String name;
}
