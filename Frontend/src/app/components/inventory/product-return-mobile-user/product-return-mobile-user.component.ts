import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-product-return-mobile-user',
  templateUrl: './product-return-mobile-user.component.html',
  styleUrls: ['./product-return-mobile-user.component.scss']
})
export class ProductReturnMobileUserComponent implements OnInit {
  productReturnMobileUsersReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  editData: any = {};

  buttonText: String = "Add Product Return Mobile User";
  title: String = "Product Return Mobile User";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(private router: Router, private reportService: ReportService) { }


  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();
  }

  add = () => {
    this.router.navigate(['inventory/product-return-mobile-user/add']);
  };

  emitEventToReload = () => {
    this.productReturnMobileUsersReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['inventory/product-return-mobile-user/edit/' + rowId]);
  };

  delete = (event:any) => {
    this.getAggregate();
  }

  getAggregate = ()=>{
    this.cardArray = [];
    this.reportService.getAggreate('product_return_mobile_user_list').subscribe((data:any[])=> {
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

    await this.reportService.getFilters('product_return_mobile_user_list').subscribe((data:any[]) => {
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
    this.productReturnMobileUsersReloadEvent.next(event);
  }

}

