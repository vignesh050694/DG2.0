package com.sts.datagreen.master.master.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OfflineDownloadRequest {
	private Long countryRevNo;
	private Long stateRevNo;
	private Long districtRevNo;
	private Long talukRevNo;
	private Long villageRevNo;
	private Long groupRevNo;

	private Long catalogueRevNo;

	private Long cropRevNo;
	private Long varietyRevNo;
	private Long gradeRevNo;

	private Long seasonRevNo;
	private Long warehouseRevNo;

}
