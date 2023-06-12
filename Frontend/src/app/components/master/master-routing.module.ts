import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'location',
    loadChildren: () => import('../master/location/location.module').then(m => m.LocationModule),
  },
  {
    path: 'season',
    loadChildren: () => import('../master/season/season.module').then(m => m.SeasonModule),
  },
  {
    path: 'crop',
    loadChildren: () => import('../master/product/product.module').then(m => m.ProductModule),
  }
  ,
  {
    path: 'vendors',
    loadChildren: () => import('../master/vendor/vendor.module').then(m => m.VendorModule),
  },
  {
    path: 'buyer',
    loadChildren: () => import('../master/buyer/buyer.module').then(m => m.BuyerModule),
  },
  {
    path: 'catalogue',
    loadChildren: () => import('../master/catalogue/catalogue.module').then(m => m.CatalogueModule),
  },
  {
    path: 'farm-input',
    loadChildren: () => import('../master/farm-input/farm-input.module').then(m => m.FarmInputModule),
  },
  {
    path: 'warehouse',
    loadChildren: () => import('../master/warehouse/warehouse.module').then(m => m.WarehouseModule),
  },
  {
    path: 'training',
    loadChildren: () => import('../master/training/training.module').then(m => m.TrainingModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  //exports: [RouterModule]
})
export class MasterRoutingModule { }
