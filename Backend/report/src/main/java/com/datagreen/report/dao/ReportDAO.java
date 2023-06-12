package com.datagreen.report.dao;

import com.datagreen.report.dto.FilterData;
import com.datagreen.report.dto.GenericReportDTO;
import com.datagreen.report.dto.PaginationDTO;

import java.util.List;
import java.util.Map;

public interface ReportDAO {

    List<Map<String, Object>> getData(GenericReportDTO genericReport, PaginationDTO pagination);

    Integer count(GenericReportDTO genericReport);

    Map<String, Object> getAggregate(String aggregate);

    List<FilterData> getFilterData(String query);

    List<Map<String, Object>> getExportData(String query);

    List<Map<String, Object>> getData(String query);

    Map<String, Object> getSingleData(String query);

    Object getSimpleData(String query);

    List<Object> getSimpleList(String query);
}
