import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { greaterThanAsyncValidatorExtension } from '@rxweb/reactive-form-validators/validators-extension';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
//   cardArray: any[] = [];
//   myCustomOptions:any= {};
//   validData: any ={};
//   chart: any[] = [];
//  constructor(private dashBoardService:DashboardService){}
//  @ViewChild('charts') public chartEl: ElementRef;
//    ngAfterViewInit() {
//     this.dashBoardService.getDashBoardData().toPromise().then((data: any)=>{
//       this.cardArray = data;
//     })
//     this.getChart();
//   }
// getChart=()=>{
//   this.dashBoardService.getDashBoardChart().toPromise().then((data: any)=>{
//     this.chart = data;
//     this.chart.forEach(chartData => {
//       this.myCustomOptions = chartData?.data;
//       this.createCustomChart(this.myCustomOptions,this.myCustomOptions.cssClass);
//       console.log(this.myCustomOptions.cssClass);
//   });
//   })
// }
// createCustomChart(myOpts: any,className?:string) {
//   this.dashBoardService.createChart(this.chartEl.nativeElement,myOpts,className);
// }
}

