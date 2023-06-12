package com.datagreen.procurement.dto;

import com.datagreen.procurement.domain.IdentifiableBase;
import lombok.Data;

@Data
public class ProcurementListDTO extends IdentifiableBase {
    private String date;
    private BasicDTO season;
    private BasicDTO farmer;
    private BasicDTO village;
    private BasicDTO warehouse;
    private Integer totalBags;
    private Integer totalNetWeight;
    private Double amount;
}
