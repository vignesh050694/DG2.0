import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from '../../../common/dynamic-forms/dropdown';
import { DynamicFormBase } from '../../../common/dynamic-forms/dynamic-form-base';
import { ProcurementService } from '../procurement/procurement.service';

@Component({
  selector: 'app-crop-harvest',
  templateUrl: './crop-harvest.component.html',
  styleUrls: ['./crop-harvest.component.scss']
})
export class CropHarvestComponent implements OnInit {
  cropHarvestReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  editData: any = {};
  buttonText: String = "Add Crop Harvest";
  title: String = "Crop Harvest";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(private router: Router, private procurementService: ProcurementService) { }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();
  }

  add = () => {
    this.router.navigate(['procurement/crop-harvest/add']);
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['procurement/crop-harvest/edit/'+rowId]);
  }

  delete = (event:any)=>{
    this.getAggregate();
  }

  emitEventToReload = () => {
    this.cropHarvestReloadEvent.next();
  };
  async getFormData() {

    await this.procurementService.getFilters('crop_harvest_report').subscribe((data: any[]) => {
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

  getAggregate= ()=>{
    this.cardArray = [];
    this.procurementService.getAggreate('crop_harvest_report').subscribe((data: any[]) => {
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
    this.cropHarvestReloadEvent.next(event);
  }
}
