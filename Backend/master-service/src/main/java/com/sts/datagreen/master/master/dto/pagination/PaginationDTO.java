package com.sts.datagreen.master.master.dto.pagination;

import lombok.Data;

import java.util.List;

@Data
public class PaginationDTO {
    private Integer draw;
    private Integer pageNo;
    private Integer pageSize;
    private List<SearchCriteria> filter;
}
