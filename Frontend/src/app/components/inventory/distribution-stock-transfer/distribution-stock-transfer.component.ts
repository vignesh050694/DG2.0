import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-distribution-stock-transfer',
  templateUrl: './distribution-stock-transfer.component.html',
  styleUrls: ['./distribution-stock-transfer.component.scss']
})
export class DistributionStockTransferComponent implements OnInit {

  distributionStockTransfersReloadEvent: Subject<void> = new Subject<void>();
  buttonText: String = "Add Distribution Stock Transfer";
  title: String = "Distribution Stock Transfer";

  cardArray: any[] = [];
  editData: any = {};

  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean;

  constructor(private router: Router,
    private reportService: ReportService,) { }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();
  }

  add = () => {
    this.router.navigate(['inventory/distribution-stock-transfer/add']);
  };

  getAggregate = () =>{
    this.cardArray = [];
    this.reportService.getAggreate('distribution_stock_transfer_report').subscribe((data:any[]) => {
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
    this.distributionStockTransfersReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['inventory/distribution-stock-transfer/edit/' + rowId]);
  };

  delete = (event:any) =>{
    this.getAggregate();
  }


  async getFormData() {

    await this.reportService.getFilters('distribution_stock_transfer_report').subscribe((data:any[])=> {
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
    this.distributionStockTransfersReloadEvent.next(event);
  }

}

