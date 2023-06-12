package com.sts.datagreen.master.master.service;


import com.sts.datagreen.master.master.dto.GradeDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface GradeService {

    GradeDTO saveGrade(GradeDTO grade) throws CustomException;

    List<GradeDTO> getAllGrades();


    Long getGradeCount();

    GradeDTO findById(String id);

    List<GradeDTO> findAllById(List<String> ids);

    void delete(String id);

    TableResponse getGrades(PaginationDTO pagination);

	List<GradeDTO> findGradeByVarietyId(String variety);

    List<GradeDTO> findByRevNo(Long gradeRevNo);
}
