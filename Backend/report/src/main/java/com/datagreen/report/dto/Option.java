package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Option {
    private String id;
    private String name;
    private String cssClass;
    private String src;

    public Option(String id, String name){
        this.id = id;
        this.name = name;
    }


}
