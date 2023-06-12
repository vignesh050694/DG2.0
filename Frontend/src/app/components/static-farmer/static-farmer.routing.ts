import { FarmerMapComponent } from './static-farmer-create/farmer-map/farmer-map.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'static-farmer-create',
    loadChildren: () =>
    import('./static-farmer-create/static-farmer-create.module').then(m => m.StaticFarmerCreateModule),
   },
   {
    path: 'static-farm',
    loadChildren: () =>
    import('./static-farm/static-farm.module').then(m => m.StaticFarmModule),
   },
  {
    path: 'static-sowing',
    loadChildren: () =>
    import('./static-sowing/static-sowing.module').then(m => m.StaticSowingModule),
  },
  {
    path: 'static-location',
    loadChildren: () =>
    import('./static-location/static-location.module').then(m => m.StaticLocationModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
    import('./payment/payment.module').then(m => m.PaymentModule),
  },
  {
    path: 'cash-distribution',
    loadChildren: () =>
    import('./cash-distribution/cash-distribution.module').then(m => m.CashDistributionModule),
  }
];

export const StaticFarmerRoutes = RouterModule.forChild(routes);
