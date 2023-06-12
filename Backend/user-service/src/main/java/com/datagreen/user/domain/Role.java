package com.datagreen.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import java.util.List;

@Data
@Entity
public class Role extends AuditableBase {
    private String name;

    private Boolean isAdmin;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    @Transient
    private List<RoleMenu> menus;
}
