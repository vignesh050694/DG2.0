import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductReturnMobileUserComponent } from './product-return-mobile-user.component';
import { ProductReturnMobileUserRoutes } from './product-return-mobile-user.routing';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { ProductReturnMobileUserListComponent } from './product-return-mobile-user-list/product-return-mobile-user-list.component';
import { ProductReturnMobileUserAddComponent } from './product-return-mobile-user-add/product-return-mobile-user-add.component';
import { ProductReturnMobileUserDetailsComponent } from './product-return-mobile-user-details/product-return-mobile-user-details.component';

@NgModule({
  imports: [
    CommonModule,
    ProductReturnMobileUserRoutes,
    CommonSharedModule,
  ],
  declarations: [ProductReturnMobileUserComponent, ProductReturnMobileUserListComponent, ProductReturnMobileUserAddComponent, ProductReturnMobileUserDetailsComponent],
  providers: [DatePipe]
})
export class ProductReturnMobileUserModule { }
