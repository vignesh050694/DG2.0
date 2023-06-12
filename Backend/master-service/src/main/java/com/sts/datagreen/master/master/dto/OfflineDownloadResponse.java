package com.sts.datagreen.master.master.dto;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.Group;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.domain.Village;
import com.sts.datagreen.master.master.domain.Warehouse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OfflineDownloadResponse {
	private List<Country> countries;
	private List<State> states;
	private List<District> districts;
	private List<Taluk> taluks;
	private List<Village> villages;
	private List<Catalogue> catalogues;
	private List<CropDTO> crops;
	private List<VarietyDTO> varities;
	private List<SeasonDTO> seasons;
	private List<Group> groups;
	private List<Warehouse> warehouses;
	private List<GradeDTO> grades;
}
