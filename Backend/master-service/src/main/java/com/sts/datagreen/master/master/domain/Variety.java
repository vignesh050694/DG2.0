package com.sts.datagreen.master.master.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "variety")
@Where(clause = "is_deleted = false")
public class Variety extends AuditableBase {
    private String code;

    private String name;

    private Integer daysToGrow;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "crop_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Crop crop;

    @OneToMany(mappedBy = "variety")
    @JsonIgnore
    private List<Grade> grades;

}
