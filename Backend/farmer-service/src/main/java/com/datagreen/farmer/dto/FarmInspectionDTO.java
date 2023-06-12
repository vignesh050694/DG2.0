package com.datagreen.farmer.dto;

import com.datagreen.farmer.domain.FarmInspection;
import lombok.Data;

@Data
public class FarmInspectionDTO {
    private String inspectionDateStr;
    private String sowingId;
    private Boolean pestNoticed;
    private Boolean diseaseNoticed;
    private String statusOfGrowth;
    private String audioPath;
    private String mobileUser;
    private String organization;
    private FarmInspection.InspectionType type;
}
