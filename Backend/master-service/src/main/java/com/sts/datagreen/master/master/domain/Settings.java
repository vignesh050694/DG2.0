package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

@Data
@Entity(name = "settings")
@Where(clause = "is_deleted = false")
public class Settings extends AuditableBase {
    private String name;
    private Long value;
}
