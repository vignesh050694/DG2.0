package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import java.util.Date;

@Data
@Entity
@Table(name = "farmer_group")
@Where(clause = "is_deleted = false")
public class Group extends AuditableBase {
    private String code;
    private String name;
    private Long count;
    @Temporal(TemporalType.DATE)
    @JsonIgnore
    private Date formationDate;
    @Transient
    private String formationDateStr;
}
