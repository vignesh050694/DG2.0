package com.datagreen.user.domain;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
public class RoleMenu extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "role_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "menu_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "scope_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Scopes scope;
}
