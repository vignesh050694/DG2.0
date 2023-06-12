import { Component, OnInit, } from '@angular/core';
@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {
  data: any;
  constructor() {

  }
  ngOnInit() {
    this.data = {
      "isStepRequired": "true",
      "title": "Farmer",
      "pages": [
        {
          "id": "farmerDetails",
          "title": "Farmer Details",
          "pageIndex": 1,
          "cssClass": "nav-item list-group-item active",
          "anchor": {
            "cssClass": "nav-link active"
          }
        },
      ],
      "segments": {
        "farmerDetails": {
          "id": "farmerDetails",
          "cssClass": "tab-pane fade show active",
          "card": [
            {
              "cssClass": "add-training-selec-blk common-box box-shadow bg-white br14 mt-5",
              "sections": [
                {
                  "title": "Main Information",
                  "type": "card",
                  "cssClass": "col-6 pl-4",
                  "controls": [
                    {
                      "label": {
                        "text": "Enrollment place",
                        "cssClass": "p p-14 fw-600 mb-3",
                      },
                      "div": {
                        "cssClass": "col-4"
                      },
                      "type": "select",
                      "cssClass": "st form-control pr-form-control",
                      "id": "enrollmentPlace",
                      "options": [
                        {
                          "id": "w3sdasqwrw",
                          "name": "Bhaiwandhi"
                        },
                        {
                          "id": "w3sdasqsadrw",
                          "name": "Option3"
                        },
                        {
                          "id": "w3sdasaxczrw",
                          "name": "Option2"
                        }
                      ]
                    }
                  ]
                }

              ],
            }
          ],
        }
      }
    }
  }
}
