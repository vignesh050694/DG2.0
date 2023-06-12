import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ProcurementService } from '../procurement/procurement.service';

@Component({
  selector: 'app-product-reception',
  templateUrl: './product-reception.component.html',
  styleUrls: ['./product-reception.component.scss']
})
export class ProductReceptionComponent implements OnInit {
  cardArray: any[] = [];
  formData: DynamicFormBase<any>[] = [];
  title: string = "";
  buttonText: string = "Add Product Reception";
  procurementReloadEvent: Subject<void> = new Subject<void>();

  editData: any = {};                  //Send edit data to add component
  isFilterDataLoaded: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private procurementService: ProcurementService
  ) { }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();
  }


  add = () => {
    this.router.navigate(['procurement/product-reception/add']);
  };

  search = (text) => {
    this.procurementReloadEvent.next(text);
  };

  getAggregate = () =>{
    this.cardArray=[];
    this.procurementService.getAggreate('product_reception_report').subscribe((data: any[]) => {
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

    await this.procurementService.getFilters('product_reception_report').subscribe((data: any[]) => {
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

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['procurement/product-reception/product-reception-edit/' + rowId]);
  };

  delete = (event) =>{
    this.getAggregate();
  }


}
