package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Entity
@Data
@Table(name = "farmer_loan_details")
public class FarmerLoanDetails extends AuditableBase{

    private Boolean loanTakenLastYear;
    private Double repaymentAmount;
    private Double amount;
    private Double interest;

    //date
    private Date repaymentDate;
    @Transient
    private String repaymentDateStr;

    private String loanTakenFrom;
    private String purpose;
    private String period;
    private String security;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "farmer")
    private Farmer farmer;
}
