package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "catalogue_type")
@Where(clause = "is_deleted = false")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class CatalogueType extends AuditableBase{
    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String type;
}
