package com.sts.datagreen.master.master.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "device")
@Where(clause = "is_deleted = false")
public class Device extends AuditableBase {
    private String code;

    private String name;

    private String serialNo;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

    private Long version;

    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "user_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private MobileUser user;

    @Transient
    private List<String> names;

    @Column(columnDefinition = "boolean default false")
    private Boolean isRegistered;
}
