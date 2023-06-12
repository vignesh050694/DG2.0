package com.datagreen.farmer.service;

import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;

import java.util.List;
import java.util.Map;

public interface PaginationService {

    TableResponseDynamic getPagination(PaginationDTO paginationDTO,String table,String join,String count);

    List<Map<String,Object>> executeListQuery(String query,List<SearchCriteria> filter);

}
