package com.sts.datagreen.master.master.dto;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Category;
import lombok.Data;

@Data
public class SubCategoryDTO {
    private String id;
    private String name;
    private Double price;
    private BasicDTO unit;
    private BasicDTO category;

}
