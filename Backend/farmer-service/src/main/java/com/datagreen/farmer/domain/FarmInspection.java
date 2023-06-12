package com.datagreen.farmer.domain;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Data
@Entity
@Table(name = "farm_inspection")
@Where(clause = "is_deleted = false")
public class FarmInspection extends AuditableBase{

    public enum InspectionType {
        REGULAR_INSPECTION,
        NEED_BASED_INSPECTION
    }

    @Column(nullable = false)
    private Date inspectionDate;

    private String season;

    @Transient
    private String inspectionDateStr;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "sowing_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Sowing sowing;

    private Boolean pestNoticed;

    private Boolean diseaseNoticed;

    private String statusOfGrowth;

    private String audioPath;

    private InspectionType type;

    private String mobileUser;

    private String organization;

}
