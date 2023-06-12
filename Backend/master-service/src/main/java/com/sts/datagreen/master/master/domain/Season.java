package com.sts.datagreen.master.master.domain;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import org.hibernate.annotations.Where;

@Data
@Entity
@Table(name = "season")
@Where(clause = "is_deleted = false")
public class Season extends AuditableBase{

	private String name;

	private String code;

	@Temporal(TemporalType.DATE)
	private Date fromDate;

	@Temporal(TemporalType.DATE)
	private Date toDate;

}
