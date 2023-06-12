package com.datagreen.report.util;

import com.datagreen.report.dto.DynamicPageDTO;
import com.datagreen.report.dto.Segment;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.LinkedHashMap;
import java.util.Map;

public class TestClass {

    public static void main(String[] args) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            DynamicPageDTO dto =new DynamicPageDTO();
            Map<String, Segment> segmentMap = new LinkedHashMap<>();
            segmentMap.put("personal", new Segment());
            segmentMap.put("family", new Segment());
            dto.setSegments(segmentMap);
            System.out.println(mapper.writeValueAsString(dto));
        }catch (Exception e){

        }
    }
}
