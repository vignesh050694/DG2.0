package com.sts.datagreen.master.master.dto.meta;

import lombok.Data;
import java.util.List;

@Data
public class Section {
    private String id;
    private String component;
    private Boolean required;
    private Integer minLength;
    private Integer maxLength;
    private List<DisplayText> displayText ;
    private Props props;
    private Integer order;
    private List<Option> options;
    private String query;
}
