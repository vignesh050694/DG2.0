package com.datagreen.farmer.domain;

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
import java.util.Date;

@Data
@Entity
@Table(name = "payment")
@Where(clause = "is_deleted = false")
public class Payment extends AuditableBase{
   private String paymentMode;
   private Date date;
   private String mobileUser;
   private Double balance;
   private String village;

   @ManyToOne(fetch = FetchType.LAZY, optional = true)
   @JoinColumn(name = "farmer", nullable = true)
   @OnDelete(action = OnDeleteAction.CASCADE)
   @JsonManagedReference
   @JsonIgnoreProperties({"hibernateLazyInitializer"})
   private Farmer farmer;

   private Double farmerBalance;
   private Double farmerLoanAmount;
   private Double farmerLoanBalance;
   private Double amount;
   private String remark;
   @Transient
   private String dateStr;
}
