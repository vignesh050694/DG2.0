import { Routes, RouterModule } from '@angular/router';
import { CropHarvestAddComponent } from './crop-harvest-add/crop-harvest-add.component';
import { CropHarvestComponent } from './crop-harvest.component';

const routes: Routes = [
  {
    path: "",
    component: CropHarvestComponent
  },
  {
    path: "add",
    component: CropHarvestAddComponent
  },
  {
    path: "edit/:id",
    component: CropHarvestAddComponent
  },
];

export const CropHarvestRoutes = RouterModule.forChild(routes);
