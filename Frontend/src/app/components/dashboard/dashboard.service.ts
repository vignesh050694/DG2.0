import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getDashBoardData = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getDashBoardCard);
  }

  getDashBoardChart = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getDashBoardCharts);
  }

  getMetrics(url: string, params: any) {
    return this.commonHttpClientService.httpPost((url), params);
  }

  charts = [];
  createChart(container, options?: any, className?: string) {

    let opts = options;
    let e = document.createElement("div");
    if (!!className)
       e.className = className;
       container.appendChild(e);

    if (!!opts.chart) {
      opts.chart['renderTo'] = e;
    }
    else {
      opts.chart = {
        'renderTo': e
      }
    }
    this.charts.push(new Highcharts.Chart(opts));
  }
}
