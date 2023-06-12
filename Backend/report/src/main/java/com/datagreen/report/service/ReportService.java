package com.datagreen.report.service;

import com.datagreen.report.dto.BasicDTO;
import com.datagreen.report.dto.FilterDTO;
import com.datagreen.report.dto.GenericDetailDTO;
import com.datagreen.report.dto.GenericRequestDetail;
import com.datagreen.report.dto.PaginationDTO;
import com.datagreen.report.dto.TableResponse;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

public interface ReportService {
    TableResponse getGenericReportData(PaginationDTO pagination);

    List<BasicDTO> getAggregate(String report);

    List<FilterDTO> getFilters(String report);

    ByteArrayInputStream downloadPdF(String report) throws IOException;

    ByteArrayInputStream downloadExcel(String report) throws IOException;

    GenericDetailDTO getGenericRequestDetail(GenericRequestDetail genericRequestDetail);
}
