package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class Training extends AuditableBase{
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "training_type", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private TrainingType trainingType;


    private String description;



}
