package com.datagreen.inventory.dto.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TableResponse {
    private Integer draw;
    private Object recordsTotal;
    private Object recordsFiltered;
    private List<?> data;
}
