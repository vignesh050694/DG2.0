package com.datagreen.farmer.dto;

import com.datagreen.farmer.dto.pagination.SearchCriteria;
import lombok.Data;

import java.util.List;

@Data
public class FilterCoordinateDTO {
    private List<SearchCriteria> filter;
    private List<?> data;
}
