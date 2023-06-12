package com.datagreen.procurement.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
@MappedSuperclass
public class AuditableBase extends IdentifiableBase {
    @JsonIgnore
    private String createdUser;

    @JsonIgnore
    private String updatedUser;

    @JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @JsonIgnore 
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    @JsonIgnore 
    private Long revisionNo;

    @JsonIgnore 
    private String branch;

    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted;
}
