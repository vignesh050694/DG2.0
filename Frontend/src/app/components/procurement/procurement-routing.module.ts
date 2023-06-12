import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'procurement', loadChildren: () => import('./procurement/procurement.module').then(m => m.ProcurementModule), },
  { path: 'product-transfer', loadChildren: () => import('./product-transfer/product-transfer.module').then(m => m.ProductTransferModule) },

  { path: 'product-reception', loadChildren: () => import('../procurement/product-reception/product-reception.module').then(m => m.ProductReceptionModule) },
  { path: 'crop-sale', loadChildren: () => import('../procurement/crop-sale/crop-sale.module').then(m => m.CropSaleModule) },
  { path: 'crop-harvest', loadChildren: () => import('../procurement/crop-harvest/crop-harvest.module').then(m => m.CropHarvestModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementRoutingModule { }
