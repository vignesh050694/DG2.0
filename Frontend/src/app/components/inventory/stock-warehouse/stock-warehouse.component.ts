import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-stock-warehouse',
  templateUrl: './stock-warehouse.component.html',
  styleUrls: ['./stock-warehouse.component.scss']
})
export class StockWarehouseComponent implements OnInit {
  stocksWarehouseReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  editData: any = {};

  title: String = "Stocks Warehouse";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(private router: Router, private reportService: ReportService) { }


  async ngOnInit() {
    await this.getFormData();
    this.reportService.getAggreate('Warehouse_stock_Report').subscribe((data:any[]) => {
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

  add = () => {
    this.router.navigate(['inventory/warehouse-stock/add']);
  };

  emitEventToReload = () => {
    this.stocksWarehouseReloadEvent.next();
  };

  // edit = (rowId: any) => {
  //   this.editData.id = rowId;
  //   this.router.navigate(['inventory/warehouse-stock/edit/' + rowId]);
  // };

  async getFormData() {
    await this.reportService.getFilters('Warehouse_stock_Report').subscribe((data:any[])=> {
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
    this.stocksWarehouseReloadEvent.next(event);
  }

}
