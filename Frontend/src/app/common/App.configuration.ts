import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfiguration {

  successIconUrl = "assets/images/icons/modal-success-ico.png"
  failureIconUrl = "assets/images/icons/modal-failure-ico.png"

  baseUrl = environment.baseUrl;

  //UploadFile
  uploadFile = "farmer/file/save";
  getImageUrl = "farmer/file/get/by-id?id=";
  getImage = "farmer/file/by-id?id=";


  //Login
  login = "user/user/login"

  //DashBoard
  getDashBoardCard = "report/dashbaord/metrics"
  getDashBoardCharts = "report/dashbaord/charts"

  //UploadFile
  // uploadFile = "master/uploads/file"

  // Location
  getLocationCount = "master/location"
  getCropCount = "master/crop"
  getCategoryCount = "master/category"

  //country

  addCountry = "master/country/save"
  getAllCountry = "master/country/countries"
  getCountry = "master/country/"
  getCountryById = "master/country/by-id?id="
  deleteCountry = "master/country/delete?id="

  //State

  addState = "master/state/save"
  getAllState = "master/state/states"
  getStateById = "master/state/by-id?id="
  getState = "master/state"
  getStatesByCountry = "master/state/by-country?country="
  deleteState = "master/state/delete?id="

  //District

  addDistrict = "master/district/save"
  getDistrict = "master/district"
  getAllDistrict = "master/district/districts"
  deleteDistrict = "master/district/delete?id="
  getDistrictById = "master/district/by-id?id="
  getAllDistrictByState = "master/district/by-state?state="

  //Taluk

  addTaluk = "master/taluk/save"
  getTaluk = "master/taluk/"
  getAllTaluk = "master/taluk/taluks"
  deleteTaluk = "master/taluk/delete?id="
  getTalukById = "master/taluk/by-id?id="
  getAllTalukByDistrict = "master/taluk/by-district?district="
  getAllTaluks = "master/taluk/taluks"

  //Village

  addVillage = "master/village/save"
  getVillage = "master/village/"
  getAllVillage = "master/village/Villages"
  deleteVillage = "master/village/delete?id="
  getVillageById = "master/village/by-id?id="
  getVillageByTaluk = "master/village/by-taluk?taluk="

  //Seasons
  getSeason = "master/season/"
  deleteSeason = "master/season/delete?id="
  getSeasonById = "master/season/by-id?id="
  addSeason = "master/season/save"
  getAllSeasons = "master/season/seasons"

  //Crop
  getCrop = "master/crop/"
  deleteCrop = "master/crop/delete?id="
  getCropById = "master/crop/by-id?id="
  addCrop = "master/crop/save"
  getAllCrops = "master/crop/crops"

  //Organization
  getAllOrganization = "master/organization/organizations"
  deleteOrganization = "master/organization/delete?id="
  getOrganizationById = "master/organization/by-id?id="
  addOrganization = "master/organization/save"
  getOrganization = "master/organization/"

  //Variety
  getVariety = "master/variety/"
  addVareity = "master/variety/save"
  deleteVariety = "master/variety/delete?id="
  getVarietyById = "master/variety/by-id?id="
  getAllVareity = "master/variety/varieties"
  getVareityByCrop = "master/variety/by-crop?id="

  //Grade
  getGrade = "master/grade/"
  addGrade = "master/grade/save"
  deleteGrade = "master/grade/delete?id="
  getGradeById = "master/grade/by-id?id="
  getAllGrade = "master/grade/grades"
  getGradeByVariety = "master/grade/by-variety?variety="

  //Group
  getGroup = "master/group/"
  addGroup = "master/group/save"
  deleteGroup = "master/group/delete?id="
  getGroupById = "master/group/by-id?id="
  getAllGroups = "master/group/groups"

  //Vendor
  getVendor = "master/vendor/"
  addVendor = "master/vendor/save"
  getAllVendor = "master/vendor/vendors"
  deleteVendor = "master/vendor/delete?id="
  getVendorById = "master/vendor/by-id?id="

  //Buyer
  getBuyer = "master/buyer/"
  addBuyer = "master/buyer/save"
  getAllBuyer = "master/buyer/buyers"
  deleteBuyer = "master/buyer/delete?id="
  getBuyerById = "master/buyer/by-id?id="

  //User
  getUser = "master/user/"
  addUser = "master/user/save"
  getAllUser = "master/user/users"
  deleteUser = "master/user/delete?id="
  getUserById = "master/user/by-id?id="

  //Devices
  getDevice = "master/device/"

  //Catalogue
  getCatalogues = "master/catalogue/"
  addCatalogue = "master/catalogue/save"
  deleteCatalogues = "master/catalogue/delete?id="
  getCataloguesTypes = "master/catalogue/types"
  getCataloguesById = "master/catalogue/by-id?id="
  getAllCatalogues = "master/catalogue/catalogues/";
  getCataloguesByType = "master/catalogue/by-type?type=";
  getCataloguesByIds = "master/catalogue/by-ids?ids=";
  getCataloguesByTypes = "master/catalogue/by-types";
  //Category
  getCategory = "master/category/"
  addCategory = "master/category/save"
  deleteCategory = "master/category/delete?id="
  getCategoryById = "master/category/by-id?id="
  getAllCategory = "master/category/categories"

  //SubCategory
  getSubCategory = "master/subCategory/"
  addSubCategory = "master/subCategory/save"
  deleteSubCategory = "master/subCategory/delete?id="
  getSubCategoryById = "master/subCategory/by-id?id="
  getSubCategoryByCategory = "master/subCategory/by-category?id="

  //Training
  getAllTrainingTypes = "master/training/types"
  addTraining = "master/training/save"
  getTrainings = "master/training/"
  addTrainingById = "master/training/by-id?id="
  deleteTraining = "master/training/delete?id="

  //MobileUser
  getMobileUser = "master/agent/";
  addMobileUser = "master/agent/save";
  deleteMobileUser = "master/agent/delete?id=";
  getMobileUserById = "master/agent/by-id?id=";
  getAllMobileUsers = "master/agent/mobile-users";
  getMobileUserByName = "master/agent/by-name?name=";

  //Warehouse
  getWarehouse = "master/warehouse/"
  addWarehouse = "master/warehouse/save"
  deleteWarehouse = "master/warehouse/delete?id="
  getWarehouseById = "master/warehouse/by-id?id="
  getAllWarehouses = "master/warehouse/warehouses"

  //Menu
  getMenus = "user/menu"


  //Role
  getRoles = "user/role"
  getAllRoles = "user/role/roles"
  getRoleMenu = "user/role/menus?parent="
  saveRole = "user/role/save";

  //Farmer
  getFarmer = "farmer/farmer/";
  addFarmer = "farmer/farmer/save";
  deleteFarmer = "farmer/farmer/delete?id=";
  getFarmerById = "farmer/farmer/by-id?id=";
  getAllFarmer = "farmer/farmer/farmers";
  getAllFarms = "farmer/farm/farms";
  getCoordinates = "farmer/farmer/coordinates";
  getFarmerAggregate = "farmer/farmer/aggregate";
  getDropFarmers = "farmer/farmer/drop-farmers";
  getFarmerCount = "farmer/farmer/farmer-count"
  getLoanDetailsByFarmerId = "farmer/farmer/loan-by-farmer?id="


  //Farm
  getFarm = "farmer/farm/"
  addFarm = "farmer/farm/save"
  getFarmById = "farmer/farm/by-id?id="
  deleteFarm = "farmer/farm/delete?id="
  getAllFarm = "farmer/farm/farms"
  getAllSowing = "farm/sowing/sowings"
  getFarmByFarmerId = "farmer/farm/by-farmer?id="
  getCoordinatesByFarm = "farmer/farm/coordinates-by-farm?id="


  //Sowing
  getSowing = "farmer/sowing/"
  addSowing = "farmer/sowing/save"
  getSowingById = "farmer/sowing/by-id?id="
  getSowingByFarmId = "farmer/sowing/by-farm?farm=";
  deleteSowingById = "farmer/sowing/delete?id=";
  getSowingsByFarmer = "farmer/sowing/by-farmer?id=";

  //Product Reception
  getReceiptByWarehouse = "procurement/transfer/receipts?warehouse=";
  saveReception = "procurement/reception​​/save"
  getReceipt = "procurement/transfer/by-receipt?receipt="
  getProductReceptionById = "procurement/reception/by-id?id="
  getProductReception = "procurement/reception"
  deleteProductReception = "procurement/reception/delete?id="

  //proCurement
  addProcurement = "procurement/save"
  getProcurement = "procurement/"
  getProcurementById = "procurement/by-id?id="
  deleteProcurement = "procurement/delete?id="
  getProcurementByFarmerId = "procurement/procurements-by-farmer?id="

  //Product Transfer
  getTransferGrades = "procurement/transfer/grades"
  addProductTransfer = "procurement/transfer/save"
  getProductTransfer = "procurement/transfer"
  getProductTransferById = "procurement/transfer/by-id?id="
  deleteProductTransfer = "procurement/transfer/delete?id="


  //Distribution Stock Transfer
  addDistributionStockTransfer = "inventory/distribution-Stock-Transfer/save-distribution-stock-transfer"
  getDistributionStockTransferById = "inventory/distribution-Stock-Transfer/by-id?id="
  deleteDistributionStockTransfer = "inventory/distribution-Stock-Transfer/delete?id="
  getDistributionStockTransfer = "inventory/distribution-Stock-Transfer/distribution-stock-transfers"

  //Distribution Stock Reception
  addDistributionStockReception = "inventory/distribution-Stock-Reception/save-distribution-stock-reception"
  ByReceipt = "inventory/distribution-Stock-Transfer/by-receiptNumber?receiptNumber="
  getDistributionStockReceptionById = "inventory/distribution-Stock-Reception/by-id?id="
  getDistributionReceiptByWarehouse = "inventory/distribution-Stock-Transfer/receipts?warehouse="
  getDistributionStockReception = "inventory/distribution-Stock-Reception/distribution-stock-receptions"
  deleteDistributionStockReception = "inventory/distribution-Stock-Reception/delete?id="

  //Product Return Farmer
  addProductReturnFarmer = "inventory/product-return-farmer/save"
  getProductReturnFarmer = "inventory/product-return-farmer/by-id?id="
  deleteProductReturnFarmer = "inventory/product-return-farmer/delete?id="

  //Product Return MobileUser
  addProductReturnMobileUser = "inventory/product-return-mobile-user/save"
  getProductReturnMobileUser = "inventory/product-return-mobile-user/by-id?id="
  deleteProductReturnMobileUser = "inventory/product-return-mobile-user/delete?id="

  //Distribution To MobileUser
  addDistributionToMobileUser = "inventory/distribution-to-mobile-user/save"
  getMobileUserStock = "inventory/distribution-to-mobile-user"
  getDistributionToMobileUserById = "inventory/distribution-to-mobile-user/by-id?id="
  deleteDistributionToMobileUser = "inventory/distribution-to-mobile-user/delete?id="
  deleteDistributionToMobileUserDetail = "inventory/distribution-to-mobile-user/delete-detail?id="


  //Distribution To Farmer
  addDistributionToFarmer = "inventory/distribution-to-farmer/save"
  getDistributionToFarmerById = "inventory/distribution-to-farmer/by-id?id="
  deleteDistributionToFarmer = "inventory/distribution-to-farmer/delete?id="
  deleteDistributionToFarmerDetail = "inventory/distribution-to-farmer/delete-detail?id="


  //CropHarvest
  addCropHarvest = "procurement/harvest/save"
  getCropHarvestById = "procurement/harvest/by-id?id="
  deleteCropHarvest = "procurement/harvest/delete?id="
  getCropHarvest = ""

  //Loan Disbursement
  addLoanDisbursement = "inventory/loan-disbursement/save"
  getLoanDisbursement = "inventory/loan-disbursement/loan-disbursements"
  getLoanDisbursementById = "inventory/loan-disbursement/by-id?id="
  deleteLoanDisbursement = "inventory/loan-disbursement/delete?id="

  //Report
  getGenericReport = "report/generic"
  getAggregateReport = "report/aggregate?report="
  getReportFilters = "report/filter?report="
  getReportDetail = "report/generic/detail"

  //Warehouse Stock
  getWarehouseStock = "inventory/warehouse-Stock"
  addWarehouseStock = "inventory/warehouse-Stock/save"
  getWarehouseStockById = "inventory/warehouse-Stock/by-id?id="
  deleteWarehouseStock = "inventory/warehouse-Stock/delete?id=";
  deleteWarehouseStockDetail = "inventory/warehouse-Stock/delete-detail?id="

  //CropSale
  addCropSale = "/procurement/cropSale/save"
  getCropSaleById = "procurement/cropSale/by-id?id="
  deleteCropSale = "procurement/cropSale/delete?id="

  //getMenu
  getMenu = "user/menu"

  //getFarmerMenu
  getFarmerMenu = "report/dynamic/page?id="
  saveFarmerDetails = "report/dynamic/save"
  FarmerLocationAggregate = "report/dashbaord/farmer"
  getFarmerDetailInLocationPage = "report/dashbaord/farmer-detail?id="

  //transaction
  addTransaction = "/report/dynamic/save"

  //Dependency
  getDependencyOption = "/report/config/dependency"

  //User
  checkUserLogin = "user/login"

  //Dowloads
  downloadPdf = "/report/download-pdf?report=";
  downloadExcel = "/report/download-excel?report=";

  //Payment
  addPayment = "farmer/payments/save";
  getPaymentById = "farmer/payments/by-id?id=";
  getPayment = "farmer/payments/";
  getBalanceByPayment = "farmer/payments/by-farmer?farmer.id=";
  getAllPayment = "farmer/payments/payments";




  //CashDistribution
  addCashDistribution = "farmer/cash-distribution/save";
  getAllCashDistribution = "farmer/cash-distribution/cash-Distribution";
  getCashDistribution = "farmer/cash-distribution/";
  getCashDistributionById = "farmer/cash-distribution/by-id?id=";

  //Farmer-Balance
  getAmountByFarmer = "farmer/farmer-balance/by-balance?id="
}
