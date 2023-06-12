import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';
import { Dropdown } from 'src/app/common/dynamic-forms/dropdown';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-loan-disbursement',
  templateUrl: './loan-disbursement.component.html',
  styleUrls: ['./loan-disbursement.component.scss']
})
export class LoanDisbursementComponent implements OnInit {

  loanDisbursementsReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};
  cardArray: any[] = [];
  buttonText: String = "Add Loan Disbursement";
  title: String = "Loan Disbursement";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(private router: Router, private reportService: ReportService) { }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();

  }

  add = () => {
    this.router.navigate(['inventory/loan-disbursement/add']);
  };

  emitEventToReload = () => {
    this.loanDisbursementsReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
   this.router.navigate(['inventory/loan-disbursement/edit/' + rowId]);
  };

  delete = (event:any) =>{
    this.getAggregate();
  }

  async getFormData() {
    this.cardArray=[];
    await this.reportService.getFilters('loan_disbursement_report').subscribe((data:any[]) => {
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
    this.reportService.getAggreate('loan_disbursement_report').subscribe((data:any[])  => {
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
    this.loanDisbursementsReloadEvent.next(event);
  }

}
