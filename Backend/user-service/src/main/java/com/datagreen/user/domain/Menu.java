package com.datagreen.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@Data
public class Menu extends IdentifiableBase{
    private String title;
    private String activeIcon;
    private String icon;
    private String link;
    private Integer rank;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "parent_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Menu parent;


    @ManyToMany
    @JoinTable(name = "menu_scope_map", joinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "scope_id", referencedColumnName = "id"))
    private List<Scopes> scopes;

    private Integer canonicalRank;
}
