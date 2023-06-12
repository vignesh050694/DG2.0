package com.datagreen.aggregator.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CropsDTO {
    private List<BasicDTO> crops;
    private List<VarietyDTO> varieties;
    private List<GradeDTO> grades;
}
