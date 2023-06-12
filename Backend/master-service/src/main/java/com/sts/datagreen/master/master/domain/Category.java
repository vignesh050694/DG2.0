package com.sts.datagreen.master.master.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Data
@Entity
@Table(name = "category")
@Where(clause = "is_deleted = false")
public class Category extends AuditableBase{

	private String code;

	private String name;
	
	@OneToMany(mappedBy = "category")
	@JsonIgnore
	private List<SubCategory> subCategory;

	@Transient
	private List<String> names;
}
