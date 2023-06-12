import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { WarehouseService } from '../warehouse.service';
@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent implements OnInit {
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'location', 'warehouseInCharge', 'storageCapacityInTonnes'];
  definedColumns = ['name', 'location', 'warehouseInCharge', 'storageCapacityInTonnes'];
  searchColumns: any[] = [{ name: 'name', canShow: true }, { name: 'location', canShow: true },
  { name: 'warehouseInCharge', canShow: true }, { name: 'storageCapacityInTonnes', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  warehouses: any[] = [];
  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.reload();
    });
    this.reload();
  }
  reload = () => {
    this.warehouseService.getWarehouse(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.warehouses = [];
      datas.data.forEach((warehouse) => {
        let data = {
          id: warehouse?.id,
          name: warehouse?.name,
          location: warehouse?.location,
          warehouseInCharge: warehouse?.warehouseInCharge,
          storageCapacityInTonnes: warehouse?.storageCapacityInTonnes,
        }
        this.warehouses.push(data);
      })
      this.datatrigger.emit(this.warehouses);
      this.count = datas?.recordsTotal;
    })

  }
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.reload();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  deleteConfirm = (id) => {
    this.warehouseService.deleteWarehouse(id).subscribe((data: any) => {
      this.reload();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.reload();
  }
}
