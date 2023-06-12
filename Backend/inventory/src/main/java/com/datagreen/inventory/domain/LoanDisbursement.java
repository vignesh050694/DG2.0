package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class LoanDisbursement extends AuditableBase{
    private Date date;
    private String vendor;
    private String farmerName;
    private String groupName;

    @OneToMany(mappedBy = "loanDisbursement")
    private List<LoanDisbursementDetails> loanDisbursementDetails;
}
