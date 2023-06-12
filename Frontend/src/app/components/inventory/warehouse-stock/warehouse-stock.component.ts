import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-warehouse-stock',
  templateUrl: './warehouse-stock.component.html',
  styleUrls: ['./warehouse-stock.component.scss']
})
export class WarehouseStockComponent implements OnInit {

  warehouseStocksReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  editData: any = {};

  buttonText: String = "Add Warehouse Stock";
  title: String = "Warehouse Stock";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(private router: Router, private reportService: ReportService) { }


  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();

  }

  add = () => {
    this.router.navigate(['inventory/warehouse-stock/add']);
  };

  emitEventToReload = () => {
    this.warehouseStocksReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['inventory/warehouse-stock/edit/' + rowId]);
  };

  delete = (event:any) => {
    this.getAggregate();
  }

  getAggregate = () =>{
    this.cardArray = [];
    this.reportService.getAggreate('warehouse_stock_entry_list').subscribe((data:any[]) => {
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

  async getFormData() {

    // warehouse_stock_Entry_report
    await this.reportService.getFilters('warehouse_stock_entry_list').subscribe((data:any[])=> {
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
    this.warehouseStocksReloadEvent.next(event);
  }

}
