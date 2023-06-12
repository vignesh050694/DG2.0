package com.sts.datagreen.master.master.domain;

import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class Scopes extends IdentifiableBase{
    private String name;
}
