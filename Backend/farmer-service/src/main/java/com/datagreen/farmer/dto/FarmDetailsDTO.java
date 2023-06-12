package com.datagreen.farmer.dto;

import lombok.Data;

import javax.persistence.Transient;
import java.util.Date;

@Data
public class FarmDetailsDTO {

    private String id;
//  Soil and Irrigation
    private String status;
    private String source;
    private String type;

    //   Farm Labour
    private String fullTime;
    private String partTime;
    private String seasonal;

    //   Image
    private String farmPhoto;

    //   Conversion Information
    private String lastDateStr;
    private String lands;
    private String pastureLands;
    private String crops;
    private String estimatedYield;

    //    Conversion Status
    private String certificationType;
    private String currentStatus;
    private String  dateStr;
    private String inspector;
    private Boolean qualified;


}
