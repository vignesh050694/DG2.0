import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'warehouse-stock', loadChildren: () => import('../inventory/warehouse-stock/warehouse-stock.module').then(m => m.WarehouseStockModule) },
  { path: 'distribution-stock-transfer', loadChildren: () => import('../inventory/distribution-stock-transfer/distribution-stock-transfer.module').then(m => m.DistributionStockTransferModule) },
  { path: 'product-return-farmer', loadChildren: () => import('../inventory/product-return-farmer/product-return-farmer.module').then(m => m.ProductReturnFarmerModule) },
  { path: 'product-return-mobile-user', loadChildren: () => import('../inventory/product-return-mobile-user/product-return-mobile-user.module').then(m => m.ProductReturnMobileUserModule) },
  { path: 'distribution-stock-reception', loadChildren: () => import('../inventory/distribution-stock-reception/distribution-stock-reception.module').then(m => m.DistributionStockReceptionModule) },
  { path: 'distribution-to-mobile-user', loadChildren: () => import('../inventory/distribution-to-mobile-user/distribution-to-mobile-user.module').then(m => m.DistributionToMobileUserModule) },
  { path: 'distribution-to-farmer', loadChildren: () => import('../inventory/distribution-to-farmer/distribution-to-farmer.module').then(m => m.DistributionToFarmerModule) },
  { path: 'loan-disbursement', loadChildren: () => import('../inventory/loan-disbursement/loan-disbursement.module').then(m => m.LoanDisbursementModule) },
  { path: 'stock-warehouse', loadChildren: () => import('../inventory/stock-warehouse/stock-warehouse.module').then(m => m.StockWarehouseModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
