package com.sts.datagreen.master.master.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "training_type")
public class TrainingType extends AuditableBase{
    @Column(unique = true)
    private String name;

}
