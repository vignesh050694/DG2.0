package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface StateService {

	State saveState(State state) throws CustomException;

	List<State> getAllStates();

	State findById(String id);

	List<State> findByIdList(List<String> ids);

	List<State> findByCountry(String country);
	
	void delete(String id) throws CustomException ;

	TableResponse getStates(PaginationDTO pagination);

	List<State> findByRevNo(Long revNo);

}
