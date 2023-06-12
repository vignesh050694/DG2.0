import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  filters: any[] = [];

  displayedColumns: string[] = ['type', 'name'];
  definedColumns = ['type', 'name'];
  searchColumns: any[] = [{ name: 'trainingType.name', canShow: true }, { name: 'name', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  trainings: any[] = [];

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit()  {
    this.eventsSubscription = this.events.subscribe(() => {
      this.reload();
    });
    this.reload();
  }

  reload = () => {
    this.trainingService.getTraining(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.trainings = [];
      datas.data.forEach((training) => {
        let data = {
          id: training?.id,
          type: training?.trainingType?.name,
          name: training?.name
        }
        this.trainings.push(data);
      });

      this.datatrigger.emit(this.trainings);
      this.count = datas?.recordsTotal;
    })
  };

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.reload();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  };

  deleteConfirm = (id) => {
    this.trainingService.deleteTraining(id).subscribe((data: any) => {
      this.reload();
    })
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.reload();
  };

}
