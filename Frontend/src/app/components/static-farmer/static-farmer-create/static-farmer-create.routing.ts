import { FarmerMapComponent } from './farmer-map/farmer-map.component';
import { SowingScreenComponent } from './sowing-screen/sowing-screen.component';
import { StaticFarmerDetailComponent } from './static-farmer-detail/static-farmer-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { StaticFarmerAddComponent } from './static-farmer-add/static-farmer-add.component';
import { StaticFarmerCreateComponent } from './static-farmer-create.component';
import { FarmScreenComponent } from './farm-screen/farm-screen.component';

const routes: Routes = [
  { path:'',component:StaticFarmerCreateComponent},
  {
    path: 'add', component: StaticFarmerAddComponent
  },
  {
    path: 'edit', component: StaticFarmerAddComponent
  },
  {
    path: 'detail', component: StaticFarmerDetailComponent
  },
  {
    path: 'farm', component: FarmScreenComponent
  },
  {
    path: 'sowing', component: SowingScreenComponent
  },
  {
    path:'farmer-map',component:FarmerMapComponent
  }
];

export const StaticFarmerCreateRoutes = RouterModule.forChild(routes);
