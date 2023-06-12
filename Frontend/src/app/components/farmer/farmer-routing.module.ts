import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFarmerComponent } from './add-farmer/add-farmer.component';
import { FarmLocationComponent } from './farm-location/farm-location.component';
import { MapsComponent } from './Maps/Maps.component';

const routes: Routes = [
  {
    path: 'add-farmer', component: AddFarmerComponent
  },
  {
    path: 'farm-location', component: FarmLocationComponent
  },
  {
    path: 'map', component: MapsComponent
  },
  {
    path: 'static-farmer-create',
    loadChildren: () =>
    import('../static-farmer/static-farmer-create/static-farmer-create.module').then(m => m.StaticFarmerCreateModule),
   },
   {
    path: 'static-farm',
    loadChildren: () =>
    import('../static-farmer/static-farm/static-farm.module').then(m => m.StaticFarmModule),
   },
  {
    path: 'static-sowing',
    loadChildren: () =>
    import('../static-farmer/static-sowing/static-sowing.module').then(m => m.StaticSowingModule),
  },
  {
    path: 'static-location',
    loadChildren: () =>
    import('../static-farmer/static-location/static-location.module').then(m => m.StaticLocationModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
    import('../static-farmer/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'cash-distribution',
    loadChildren: ()=>
    import('../static-farmer/cash-distribution/cash-distribution.module').then(m => m.CashDistributionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
