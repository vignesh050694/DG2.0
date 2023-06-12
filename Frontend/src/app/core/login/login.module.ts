import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CommonSharedModule } from '../../common/common-shared.module';
import { LoginRoutes } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutes,
    CommonSharedModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
