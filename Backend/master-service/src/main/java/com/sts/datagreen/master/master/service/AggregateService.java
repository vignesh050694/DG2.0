package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.dto.CategoryCountDTO;
import com.sts.datagreen.master.master.dto.CropCountDTO;
import com.sts.datagreen.master.master.dto.LocationCountDTO;

public interface AggregateService {

    LocationCountDTO getLocationCounts();

    CropCountDTO getCropCounts();

    CategoryCountDTO getCateogryCount();
}
