package com.datagreen.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "web_user")
public class User extends AuditableBase {
    private String name;
    private String subOrganization;
    private String firstName;
    private String lastName;
    private String mobileNo;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

    private String email;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "role_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Role role;

    @Column(unique = true)
    private String userName;

    private String password;

    @Transient
    private List<String> roles = new ArrayList<>();
}
