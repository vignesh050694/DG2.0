package com.sts.datagreen.master.master.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Data
@Entity
@Table(name = "subCategory")
@Where(clause = "is_deleted = false")
public class SubCategory extends AuditableBase {
	private String code;

	private String name;

	private Double price;

	@ManyToOne
	@JoinColumn(name = "unit", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonManagedReference
	private Catalogue unit;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "category", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonManagedReference
	private Category category;

	@Transient
	private List<String> names;

}
