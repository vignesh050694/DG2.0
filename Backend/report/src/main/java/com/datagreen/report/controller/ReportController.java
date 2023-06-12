package com.datagreen.report.controller;

import com.datagreen.report.dto.BasicDTO;
import com.datagreen.report.dto.FilterDTO;
import com.datagreen.report.dto.GenericDetailDTO;
import com.datagreen.report.dto.GenericRequestDetail;
import com.datagreen.report.dto.PaginationDTO;
import com.datagreen.report.dto.TableResponse;
import com.datagreen.report.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RequestMapping
@RestController
public class ReportController {
    @Autowired
    private ReportService reportService;

    @PostMapping("/generic")
    public ResponseEntity<TableResponse> getGenericReportData(@RequestBody PaginationDTO pagination){
        TableResponse tableResponse =  reportService.getGenericReportData(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.OK);
    }

    @GetMapping("/aggregate")
        public ResponseEntity<List<BasicDTO>> getAggregate(@RequestParam("report") String report){
        return new ResponseEntity<>(reportService.getAggregate(report), HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<FilterDTO>> getFilters(@RequestParam("report") String report){
        return new ResponseEntity<>(reportService.getFilters(report), HttpStatus.OK);
    }

    @PostMapping("/generic/detail")
    public ResponseEntity<GenericDetailDTO> getGenericRequestDetail(@RequestBody GenericRequestDetail genericRequestDetail){
        GenericDetailDTO tableResponse =  reportService.getGenericRequestDetail(genericRequestDetail);
        return new ResponseEntity<>(tableResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/download-pdf", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity downloadInvoice(@RequestParam("report") String report, HttpServletResponse response) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename="+report+"_"+System.currentTimeMillis()+".pdf");
        ByteArrayInputStream bis = reportService.downloadPdF(report);

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));

    }

    @RequestMapping(value = "/download-excel", method = RequestMethod.GET)
    public ResponseEntity downloadExcel(@RequestParam("report") String report, HttpServletResponse response) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.add("Content-Disposition", "attachment; filename=" + report +"_" +System.currentTimeMillis() + ".xls");
        ByteArrayInputStream bis = reportService.downloadExcel(report);

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new InputStreamResource(bis));

    }

}
