package com.sts.datagreen.master.master.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name="agent")
@Where(clause = "is_deleted = false")
public class MobileUser extends AuditableBase{
    private String name;
    private String userId;
    private String idNo;
    private String gender;
    private String address;
    private Long phoneNo;
    private Long mobileNo;
    private String emailId;
    private String isActive;
    private Long balance;

    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "identity_type", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CatalogueType idType;

    @Transient
    private String updateBalance;

    @Transient
    private String key;

}
