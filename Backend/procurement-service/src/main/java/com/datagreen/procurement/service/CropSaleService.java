package com.datagreen.procurement.service;


import com.datagreen.procurement.dto.CropSaleDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;

import java.text.ParseException;

public interface CropSaleService {
    void saveCropSale(CropSaleDTO cropSaleDTO) throws ParseException;

    CropSaleDTO findById(String id);

    TableResponse getCropSales(PaginationDTO pagination);

    void delete(String id) throws CustomException;
}
