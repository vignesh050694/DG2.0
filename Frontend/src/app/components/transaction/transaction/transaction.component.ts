import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FarmerService } from '../../farmer/farmer.service';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  isSubmit: boolean = false;
  errorList: any = {};
  data: any = {};
  errors: any = {};
  expandedIndex = 0;
  @Output() widget = new EventEmitter();
  isFormValid: boolean = true;
  canShowSubmit: boolean = false;
  headings: any[] = [];
  selectedTab: any;
  title: string;
  buttonText: string;
  pageId: any;

  dtOptions: DataTables.Settings = {};

  @Input() valueEmitter: any;

  constructor(private farmerService: FarmerService,
    private appConfiguration: AppConfiguration,
    private responseModalService: ResponseModalService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.pageId = params['pageId'];
      this.farmerService.setPage(this.pageId);
      this.loadMenu();
    })
    this.dtOptions = {
      searching: false,
      paging: false,
      info: false
    };

  }

  save(value: any) {
    this.widget.emit(value);
  }

  submit() {

    console.log(this.farmerService.getPageResult());


    let menuChanged = false;
    this.farmerService.addFarmerDetails();
    this.farmerService.setFarmerSubmit(true);
    setTimeout(() => {
      this.data.pages.forEach((page: any, i: number) => {
        if ($("#" + page.id).hasClass("show") && !(menuChanged)) {
          //To make current tab as finished
          if (!this.errorList[page.id]) {
            $("#" + page.id + "-list").addClass("finished");
            $("#" + page.id + "-list").removeClass("active");
            this.isFormValid = true;
          }
          else {
            this.isFormValid = false;
          }
          if (!(i + 1 == this.data.pages.length)) {
            //Open new next tab steps
            //remove current class from show
            $("#" + page.id).removeClass("active show")
            $("#" + page.id + "-tab").removeClass("active show")

            //Add show to next tab
            $("#" + this.data.pages[i + 1].id).addClass("active fade show tab-pane");
            $("#" + this.data.pages[i + 1].id + "-list").addClass("active");
            $("#" + this.data.pages[i + 1].id + "-tab").addClass("active");
          }
          else {
            if (this.isFormValid)
              this.canShowSubmit = true;
          }
          menuChanged = true;
        }
      });
      if (this.isFormValid) {
        this.farmerService.result['pid'] = this.pageId;
        this.farmerService.addFarmerDetails().subscribe(() => {
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl, this.data?.pages[0]?.title, 'Your information has been saved successfully!');
          this.cancel();
        });
      }
    }, 1000);
  }

  cancel = () => {
    this.router.navigate(['report/', this.farmerService.getPage()]);
  };

  onErrorReceived(event, page) {
    this.errorList[page.id] = event;
  }

  loadMenu() {
    //get the Fields From the Server
    this.farmerService.getFormFields(this.pageId).subscribe((fields: any) => {
      this.data = fields;
      this.initData(fields);
    });
    //this.httpClient.get('../assets/farmerDynamicOldData.json').subscribe((fields: any) => {
    //  this.data = fields;
    //  this.initData(fields);
    //});
  }

  //to show which Tab has Error and Submit
  tabChange = (item: any) => {
    if (this.errorList[item.id]) {
      this.canShowSubmit = false;
    }
  }

  initData = (fields) => {
    fields?.pages.forEach((page: any) => {
      let pageData = fields.segments[page.id];
      pageData.card.forEach((datacard: any) => {
        datacard.sections.forEach((section: any) => {
          section.controls.forEach((control: any) => {
            if (!(control.type == "accordian")) {
              if (!!control.value) {
                //to get the Key Value Pair as Result
                this.farmerService.result[control.id] = control?.value;
              }
            }
          });
        });
      });
    });
  }
}
