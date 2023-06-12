package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Controls {
    private String name;
    private Label label;
    private String cssClass;
    private String type;
    private Boolean isEdit;
    private String placeholder;
    private Dependency dependency;
    private String endPoint;
    private HrLineProperty hrLineProperty;
    private Div div;
    private Object value;
    private List<String> showIds;
    private List<String> showOffIds;
    private List<String> switchIds;
    private List<String> switchOffIds;
    private List<AccordianControl> accordianControls;
    private List<Controls> controls;
    private List<TableData> tableData;
    private DataOptions dtOptions;
    private Boolean isDisabled;
    private List<BasicDTO> displayedColumns;
    private List<Option> options = new ArrayList<>();
    private String id;
    private Object rules;
    private Object eval;
    @JsonIgnore
    private String datasource;
    @JsonIgnore
    private String query;
    private Map<String, String> dependencyQuery;
    private Boolean disabled = false;

    private  List<List<Controls>> tableControls;
}
