package com.sts.datagreen.master.master.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@MappedSuperclass
@Data
public class IdentifiableBase {
	   @Id
	    @GeneratedValue(generator = "custom-generator",
	            strategy = GenerationType.IDENTITY)
	    @GenericGenerator(
	            name = "custom-generator",
	            strategy = "com.sts.datagreen.master.master.domain.BaseIdentifierGenerator")
	    protected String id;
}
