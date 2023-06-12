import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { Error404Component } from './common/error404/error404.component';
import { BlankComponent } from './blank/blank.component';

import { DataTablesModule } from 'angular-datatables';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonSharedModule } from './common/common-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationInitializerFactory, HttpLoaderFactory } from './translation.config';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AccountModule } from './../app/account/account/account.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { HttpErrorInterceptor } from '../app/core/HttpError/http-error.interceptor';
import { ReportComponent } from './components/report/report.component';
import { AccessTokenService } from './common/access-token.service';
import { LoginModule } from './core/login/login.module';
import { ReportDetailComponent } from './components/report/report-detail/report-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    Error404Component,
    BlankComponent,
    DefaultLayoutComponent,
    ReportComponent,
    ReportDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    CarouselModule,
    BrowserAnimationsModule,
    CommonSharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AccountModule,
     KeycloakAngularModule
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
     {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
     },
    // AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }

 function initializeKeycloak(keycloak: KeycloakService) {
   return () =>
     keycloak.init({
       config: {
           url: environment.loginUrl,
         realm: environment.realm,
         clientId: environment.clientId,
       },
       initOptions: {
         onLoad: 'login-required'
       },
     });
 }
