package com.datagreen.inventory.domain;

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
public class LoanDisbursementDetails extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_disbursement_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JsonBackReference
    private LoanDisbursement loanDisbursement;

    private String category;
    private String product;
    private Double unitPrice;
    private Double amount;
    private Double quantity;
}
