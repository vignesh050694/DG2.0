package com.sts.datagreen.master.master.controller;


import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.Group;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.domain.Village;
import com.sts.datagreen.master.master.domain.Warehouse;
import com.sts.datagreen.master.master.dto.CropDTO;
import com.sts.datagreen.master.master.dto.GradeDTO;
import com.sts.datagreen.master.master.dto.OfflineDownloadRequest;
import com.sts.datagreen.master.master.dto.OfflineDownloadResponse;
import com.sts.datagreen.master.master.dto.SeasonDTO;
import com.sts.datagreen.master.master.dto.VarietyDTO;
import com.sts.datagreen.master.master.service.CatalogueService;
import com.sts.datagreen.master.master.service.CountryService;
import com.sts.datagreen.master.master.service.CropService;
import com.sts.datagreen.master.master.service.DistrictService;
import com.sts.datagreen.master.master.service.GradeService;
import com.sts.datagreen.master.master.service.GroupService;
import com.sts.datagreen.master.master.service.SeasonService;
import com.sts.datagreen.master.master.service.StateService;
import com.sts.datagreen.master.master.service.TalukService;
import com.sts.datagreen.master.master.service.VarietyService;
import com.sts.datagreen.master.master.service.VillageService;
import com.sts.datagreen.master.master.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/download")
public class DownloadController {
	@Autowired
	private CountryService countryService;

	@Autowired
	private StateService stateService;

	@Autowired
	private DistrictService districtService;

	@Autowired
	private TalukService talukService;

	@Autowired
	private VillageService villageService;

	@Autowired
	private CatalogueService catalogueService;

	@Autowired
	private GroupService groupService;

	@Autowired
	private SeasonService seasonService;

	@Autowired
	private CropService cropService;

	@Autowired
	private VarietyService varietyService;

	@Autowired
	private GradeService gradeService;

	@Autowired
	private WarehouseService warehouseService;

	@PostMapping("")
	public ResponseEntity<OfflineDownloadResponse> getLocation(@RequestBody OfflineDownloadRequest offlineDownloadRequest)
			throws InterruptedException, ExecutionException {

		CompletableFuture<List<Country>> completableCountry = CompletableFuture
				.supplyAsync(() -> countryService.findByRevNo(offlineDownloadRequest.getCountryRevNo()));

		CompletableFuture<List<State>> completableState = CompletableFuture
				.supplyAsync(() -> stateService.findByRevNo(offlineDownloadRequest.getStateRevNo()));

		CompletableFuture<List<District>> completableDistrict = CompletableFuture
				.supplyAsync(() -> districtService.findByRevNo(offlineDownloadRequest.getDistrictRevNo()));

		CompletableFuture<List<Taluk>> completableTaluk = CompletableFuture
				.supplyAsync(() -> talukService.findByRevNo(offlineDownloadRequest.getTalukRevNo()));

		CompletableFuture<List<Village>> completableVillage = CompletableFuture.supplyAsync(() -> villageService.findByRevNo(offlineDownloadRequest.getVillageRevNo()));

		CompletableFuture<List<Catalogue>> completableCatalogue = CompletableFuture
				.supplyAsync(() -> catalogueService.findByRevNo(offlineDownloadRequest.getCatalogueRevNo()));

		CompletableFuture<List<SeasonDTO>> completableSeason = CompletableFuture.supplyAsync(() -> seasonService.findByRevisionNoGreaterThan(offlineDownloadRequest.getSeasonRevNo()));

		CompletableFuture<List<CropDTO>> completableCrop = CompletableFuture.supplyAsync(() -> cropService.findByRevNo(offlineDownloadRequest.getCropRevNo()));

		CompletableFuture<List<VarietyDTO>> completableVariety = CompletableFuture.supplyAsync(() -> varietyService.findByRevNo(offlineDownloadRequest.getVarietyRevNo()));

		CompletableFuture<List<GradeDTO>> completableGrade = CompletableFuture.supplyAsync(() -> gradeService.findByRevNo(offlineDownloadRequest.getGradeRevNo()));

		CompletableFuture<List<Warehouse>> completableWarehouse = CompletableFuture.supplyAsync(() -> warehouseService.findByRevNo(offlineDownloadRequest.getWarehouseRevNo()));

		CompletableFuture<List<Group>> completableGroups = CompletableFuture.supplyAsync(()->groupService.findByRevNo(offlineDownloadRequest.getGroupRevNo()));

		OfflineDownloadResponse offlineDownloadResponse = new OfflineDownloadResponse(completableCountry.get(), completableState.get(),
				completableDistrict.get(), completableTaluk.get(), completableVillage.get(),
				completableCatalogue.get(), completableCrop.get(), completableVariety.get(), completableSeason.get(), completableGroups.get(), completableWarehouse.get(), completableGrade.get());

		return new ResponseEntity<>(offlineDownloadResponse, HttpStatus.OK);
	}

}
