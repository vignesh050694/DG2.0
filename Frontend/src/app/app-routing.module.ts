import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './common/error404/error404.component';
import { BlankComponent } from './blank/blank.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AuthGuard } from './core/Auth/auth.guard';
import { ReportComponent } from './components/report/report.component';


const routes: Routes = [
  { path: 'error404', component: Error404Component },
  {
    path: 'login',
    loadChildren: () => import('../app/core/login/login.module').then(m => m.LoginModule)
  },
  { path: '', redirectTo:'dashboard', pathMatch:'full' },
  {
    path: '',
    component: DefaultLayoutComponent,
    //canActivate: [AdminGuard],
    // canActivate: [AdminGuard],
    data: {
      title: 'Home'
    },
    children: [
      { path: 'blank', component: BlankComponent ,canActivate:[AuthGuard]},
      {
        path: 'dashboard',
        loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'master',
        loadChildren: () => import('../app/components/master/master.module').then(m => m.MasterModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../app/components/settings/settings.module').then(m => m.SettingsModule)
        // ,canLoad:[AuthGuard]
        //  ,canActivate:[AuthGuard],
      },
      {
        path: 'procurement',
        loadChildren: () => import('../app/components/procurement/Procurement.module').then(m => m.ProcurementModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('../app/components/inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: 'farmer',
         loadChildren: () => import('../app/components/farmer/farmer.module').then(m => m.FarmerModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('../app/components/transaction/transaction.module').then(m => m.TransactionModule)
      },
      {
        path: 'report/:reportName',
        component: ReportComponent
      }

    ]
  },
  //{ path: '**', component: Error404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
