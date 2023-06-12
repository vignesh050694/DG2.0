import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-distribution-stock-reception',
  templateUrl: './distribution-stock-reception.component.html',
  styleUrls: ['./distribution-stock-reception.component.scss']
})
export class DistributionStockReceptionComponent implements OnInit {

  distributionStockReceptionsReloadEvent: Subject<void> = new Subject<void>();

  cardArray: any[] = [];
  buttonText: String = "Add Distribution Stock Reception";
  title: String = "Distribution Stock Reception";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;
  editData: any = {};

  constructor(private router: Router, private reportService: ReportService) { }


  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();
  }

  add = () => {
    this.router.navigate(['inventory/distribution-stock-reception/add']);
  };

  getAggregate = ()=>{
    this.cardArray = [];
    this.reportService.getAggreate('distribution_stock_reception_report').subscribe((data:any[]) => {
      data.forEach(aggr => {
        let card = {
          "name": aggr.id,
          "count": aggr.name,
          "image": aggr.icon
        }
        this.cardArray.push(card);
      });
    });
  }

  emitEventToReload = () => {
    this.distributionStockReceptionsReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['inventory/distribution-stock-reception/edit/' + rowId]);
  };

  delete = (event:any)=>{
    this.getAggregate();
  }

  async getFormData() {

    await this.reportService.getFilters('distribution_stock_reception_report').subscribe((data:any[])=> {
      data.forEach(filter => {
        if (filter.type == 1) {
          this.formData.push(
            new Dropdown({
              key: filter?.key,
              label: filter?.label,
              options: filter?.data,
              order: 0
            })
          );
        }
      });
      this.isFilterDataLoaded = true;
      return this.formData.sort((a, b) => a.order - b.order);
    });
  }
  onSearchResult(event) {
    this.distributionStockReceptionsReloadEvent.next(event);
  }

}
