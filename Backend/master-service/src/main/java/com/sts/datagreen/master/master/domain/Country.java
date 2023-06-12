package com.sts.datagreen.master.master.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Entity
@Table(name="country")
@Data
@Where(clause = "is_deleted = false")
public class Country extends AuditableBase {
    private String name;

    @Transient
    private List<String> names;
    
    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<State> states;
}
