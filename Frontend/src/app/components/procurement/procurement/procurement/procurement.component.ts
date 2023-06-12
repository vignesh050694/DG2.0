import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Dropdown } from '../../../../common/dynamic-forms/dropdown';
import { DynamicFormBase } from '../../../../common/dynamic-forms/dynamic-form-base';
import { TextboxQuestion } from '../../../../common/dynamic-forms/textbox-question';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { ProcurementService } from '../procurement.service';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss']
})
export class ProcurementComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  procurementReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "";                  //To set the title for page header
  buttonText: string = "Add Procurement";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  cardArray: any[] = [];
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;

  constructor(
    private responseModalService: ResponseModalService,
    private readonly translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private procurementService: ProcurementService
  ) {
    this.translate.use(this.translate.store.currentLang);
  }

  async ngOnInit() {
    await this.getFormData();
    this.getAggregate();
  }

  add = () => {
    this.router.navigate(['procurement/procurement/procurement-add']);
  };

  emitEventToReload = () => {
    this.procurementReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['procurement/procurement/procurement-edit/' + rowId]);
  };

  delete = (event:any) =>{
    this.getAggregate();
  }

  getAggregate=()=>{
    this.cardArray = [];
    this.procurementService.getAggreate('Procurement_stock_Report').subscribe((data:any[]) => {
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
    await this.procurementService.getFilters('Procurement_stock_Report').subscribe((data: any[]) => {
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

  onSearchResult = (event) => {
    this.procurementReloadEvent.next(event);
  };
}
