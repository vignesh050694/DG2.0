package com.sts.datagreen.master.master.domain;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import org.hibernate.annotations.Where;

import java.util.List;

@Entity
@Table(name = "village")
@Data
@Where(clause = "is_deleted = false")
public class Village extends AuditableBase {

    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "taluk_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Taluk taluk;

    @Transient
    private List<String> villageNames;

}
