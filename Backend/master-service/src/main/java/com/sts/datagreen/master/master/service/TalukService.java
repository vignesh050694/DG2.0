package com.sts.datagreen.master.master.service;


import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface TalukService {
	
	Taluk saveTaluk(Taluk taluk) throws CustomException;

	List<Taluk> getAllTaluk();

	Taluk findById(String id);

	List<Taluk> findByIdList(List<String> ids);

	void delete(String id) throws CustomException;
	
	TableResponse getTaluks(PaginationDTO pagination);

	List<Taluk> findByDistrict(String district);

	List<Taluk> findByRevNo(Long talukRevNo);
}
