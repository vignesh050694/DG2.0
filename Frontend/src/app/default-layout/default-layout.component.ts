import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  selected = 'fr';
  title = 'sourcetrace-angular';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    //translate.setDefaultLang('en');

    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  ngOnInit() {
  }
  onChange() {
    console.log(`language changed`, this.selected);
    this.translate.use(this.selected)
  }
}
