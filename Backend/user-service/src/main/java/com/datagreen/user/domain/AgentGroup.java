package com.datagreen.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
public class AgentGroup extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "agent_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Agent agent;

    private String farmerGroup;
}
