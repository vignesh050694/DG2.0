import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ReportService } from 'src/app/common/report/report.service';
import { ProcurementService } from '../../procurement/procurement/procurement.service';

@Component({
  selector: 'app-distribution-to-farmer',
  templateUrl: './distribution-to-farmer.component.html',
  styleUrls: ['./distribution-to-farmer.component.scss']
})
export class DistributionToFarmerComponent implements OnInit {

  distributionToFarmersReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  buttonText: String = "Add Distribution To Farmer";
  title: String = "Distribution To Farmer";
  editData: any = {};
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(private router: Router, private reportService: ReportService) { }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();
  }

  add = () => {
    this.router.navigate(['inventory/distribution-to-farmer/add']);
  };

  emitEventToReload = () => {
    this.distributionToFarmersReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
   this.router.navigate(['inventory/distribution-to-farmer/edit/' + rowId]);
  };

  delete = (event:any) => {
    this.getAggregate();
  }

  async getFormData() {
    await this.reportService.getFilters('distribution_to_farmer_list').subscribe((data:any[]) => {
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
    this.reportService.getAggreate('distribution_to_farmer_list').subscribe((data:any[]) => {
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
    this.distributionToFarmersReloadEvent.next(event);
  }


}
