import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'group',
    loadChildren: () => import('../settings/group/group.module').then(m => m.GroupModule),
  },
  {
    path: 'mobile-user',
    loadChildren: () => import('../settings/mobile-user/mobile-user.module').then(m => m.MobileUserModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../settings/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'device',
    loadChildren: () => import('../settings/device/device.module').then(m => m.DeviceModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('../settings/setting/setting.module').then(m => m.SettingModule),
  },
  {
    path: 'role',
    loadChildren: () => import('../settings/role/role.module').then(m => m.RoleModule),
  },
  {
    path: 'organization',
    loadChildren: () => import('../settings/organization/organization.module').then(m => m.OrganizationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
