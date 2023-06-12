package com.datagreen.farmer.dto.pagination;


import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableResponseDynamic {
    private Integer draw;
    private Integer recordsTotal;
    private Integer recordsFiltered;
    private List<?> data;
    private Boolean isAddBtn = false;
    private String route;
}