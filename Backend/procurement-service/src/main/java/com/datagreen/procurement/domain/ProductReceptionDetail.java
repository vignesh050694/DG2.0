package com.datagreen.procurement.domain;

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
public class ProductReceptionDetail extends IdentifiableBase {
	   @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name="product_reception_id")
	    @OnDelete(action= OnDeleteAction.CASCADE)
	    @JsonBackReference
	    private ProductReception productReception;

	    private String grade;
	    private Double noOfBags;
	    private Double netWeight;
}
