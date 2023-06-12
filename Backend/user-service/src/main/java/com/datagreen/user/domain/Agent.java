package com.datagreen.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Agent extends AuditableBase{
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String mobileNumber;
    @Column(unique = true)
    private String userName;
    private String identityType;
    private String address;

    @Temporal(TemporalType.DATE)
    private Date date;

    @OneToMany(mappedBy = "agent")
    @JsonIgnore
    private List<AgentGroup> groups;

    private String device;

    private String password;

    private String version;
}
