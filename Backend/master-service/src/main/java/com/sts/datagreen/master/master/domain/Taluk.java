package com.sts.datagreen.master.master.domain;

import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "taluk")
@Data
@Where(clause = "is_deleted = false")
public class Taluk extends AuditableBase {
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "district_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private District district;

    @OneToMany(mappedBy = "taluk")
    @JsonIgnore
    private List<Village> villages;

    @Transient
    private List<String> talukNames;
}
