package com.sts.datagreen.master.master.service;


import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface DistrictService {
	District saveDistrict(District districtDto) throws CustomException;

	List<District> getAllDistrict();

	District findById(String id);

	List<District> findByIdList(List<String> ids);

	void delete(String id) throws CustomException;
	
	TableResponse getDistricts(PaginationDTO pagination);

	List<District> findByState(String state);

	List<District>  findByRevNo(Long districtRevNo);
}
