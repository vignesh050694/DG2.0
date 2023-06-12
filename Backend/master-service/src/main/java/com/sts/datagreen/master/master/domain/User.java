package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "web_user")
@Where(clause = "is_deleted = false")
public class User extends AuditableBase {
    private String name;
    private String firstName;
    private String lastName;
    private String mobileNo;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

    private String email;

    @Column(unique = true)
    private String userName;

    private String password;


    @Transient
    private List<String> roles = new ArrayList<>();
}
