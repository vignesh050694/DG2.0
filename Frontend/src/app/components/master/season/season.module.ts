import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonRoutingModule } from './season-routing.module';
import { SeasonComponent } from './season/season.component';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonAddComponent } from './season-add/season-add.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { DatePipe } from '@angular/common'
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore, LangChangeEvent } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [SeasonComponent, SeasonListComponent, SeasonAddComponent],
  imports: [
    CommonModule,
    SeasonRoutingModule,
    CommonSharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  entryComponents: [
    SeasonAddComponent
  ],
  providers: [DatePipe]
})
export class SeasonModule {
  constructor(public translationService: TranslateService) {

    this.translationService.store.onLangChange
      .subscribe((lang: LangChangeEvent) => {
        console.log(' ==> FeatureModule ', lang);
        this.translationService.use(lang.lang);
      });
  }
}
