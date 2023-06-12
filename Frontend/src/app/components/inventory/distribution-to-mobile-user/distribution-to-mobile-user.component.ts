import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { ProcurementService } from '../../procurement/procurement/procurement.service';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-distribution-to-mobile-user',
  templateUrl: './distribution-to-mobile-user.component.html',
  styleUrls: ['./distribution-to-mobile-user.component.scss']
})
export class DistributionToMobileUserComponent implements OnInit {


  distributionToMobileUsersReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};
  cardArray: any[] = [];
  buttonText: String = "Add Distribution To MobileUser";
  title: String = "Distribution To MobileUser";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(private router: Router, private reportService: ReportService) { }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();

  }

  add = () => {
    this.router.navigate(['inventory/distribution-to-mobile-user/add']);
  };

  emitEventToReload = () => {
    this.distributionToMobileUsersReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
   this.router.navigate(['inventory/distribution-to-mobile-user/edit/' + rowId]);
  };

  delete = (event:any) =>{
    this.getAggregate();
  }

  getAggregate=()=>{
    this.cardArray = [];
    this.reportService.getAggreate('distribution_to_mobile_user_list').subscribe((data:any[]) => {
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

    // await this.reportService.getFilters('distribution_to_mobile_user_report').subscribe((data:any[]) => {
    await this.reportService.getFilters('distribution_to_mobile_user_list').subscribe((data:any[]) => {
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
    this.distributionToMobileUsersReloadEvent.next(event);
  }

}
