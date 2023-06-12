import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { Dropdown } from '../../../common/dynamic-forms/dropdown';
import { ResponseModalService } from '../../../common/response-modal/response-modal.service';
import { ProcurementService } from '../procurement/procurement.service';

@Component({
  selector: 'app-product-transfer',
  templateUrl: './product-transfer.component.html',
  styleUrls: ['./product-transfer.component.scss']
})
export class ProductTransferComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  productTransferReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "";                  //To set the title for page header
  buttonText: string = "Add Product Transfer";             //To set the add button text for page header
  //Form
  editData: any = {};
  cardArray: any[] = [];
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService, private readonly translate: TranslateService,
    private router: Router, private route: ActivatedRoute,
    private procurementService: ProcurementService
  ) {
    this.translate.use(this.translate.store.currentLang);
  }
  ngOnInit(): void {
    this.getFormData();
    this.getAggregate();
  }

  add = () => {
    this.router.navigate(['procurement/product-transfer/product-transfer-add']);
  }

  emitEventToReload = () => {
    this.productTransferReloadEvent.next();
  }

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['procurement/product-transfer/product-transfer-edit/' + rowId]);
  }

  delete = (event:any) =>{
    this.getAggregate();
  }

  search = (text) => {
    this.productTransferReloadEvent.next(text);
  }

  onSearchResult = (event) => {
    console.log(JSON.stringify(event));
  };

  async getFormData() {
    await this.procurementService.getFilters('product_transfer_report').subscribe((data: any[]) => {
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

  getAggregate = ()=>{
    this.cardArray = [];
    this.procurementService.getAggreate('product_transfer_report').subscribe((data: any[]) => {
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

}
