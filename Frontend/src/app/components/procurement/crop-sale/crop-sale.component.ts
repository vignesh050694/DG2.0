import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from '../../../common/dynamic-forms/dropdown';
import { DynamicFormBase } from '../../../common/dynamic-forms/dynamic-form-base';
import { ProcurementService } from '../procurement/procurement.service';

@Component({
  selector: 'app-crop-sale',
  templateUrl: './crop-sale.component.html',
  styleUrls: ['./crop-sale.component.scss']
})
export class CropSaleComponent implements OnInit {
  cropSaleReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  buttonText: String = "Add Crop Sale";
  title: String = "Crop Sale";
  editData: any = {};//Send edit data to add component
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;
  constructor(private router: Router, private procurementService: ProcurementService) { }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();

  }

  add = () => {
    this.router.navigate(['procurement/crop-sale/add']);
  };
  emitEventToReload = () => {
    this.cropSaleReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['procurement/crop-sale/edit/' + rowId]);
  };

  delete = (event:any) => {
    this.getAggregate();
  }

  async getFormData() {

    await this.procurementService.getFilters('crop_sale_report').subscribe((data: any[]) => {
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

  getAggregate = () =>{
    this.cardArray = [];
    this.procurementService.getAggreate('crop_sale_report').subscribe((data: any[]) => {
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


  onSearchResult(event) {
    this.cropSaleReloadEvent.next(event);
  }
}
