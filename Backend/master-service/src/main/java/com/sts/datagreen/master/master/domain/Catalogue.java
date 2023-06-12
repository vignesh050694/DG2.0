package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class Catalogue extends AuditableBase {

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "catalogue_type", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CatalogueType catalogueType;

    private String name;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "parent_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Catalogue parent;

    private String type;
}
