import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductReceptionComponent } from './product-reception.component';
import { ProductReceptionListComponent } from './product-reception-list/product-reception-list.component';
import { ProductReceptionAddComponent } from './product-reception-add/product-reception-add.component';
import { ProductReceptionRoutes } from './product-reception.routing';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { ProductReceptionDetailComponent } from './product-reception-detail/product-reception-detail.component';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  console.log('VendorModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    ProductReceptionRoutes,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [ProductReceptionComponent, ProductReceptionListComponent, ProductReceptionAddComponent, ProductReceptionDetailComponent],
  providers: [DatePipe]
})
export class ProductReceptionModule { }
