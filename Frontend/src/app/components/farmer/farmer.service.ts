import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppConfiguration } from '../../common/App.configuration';
import { CommonHttpClientService } from '../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  isFarmerSubmit: boolean = false;
  data: any[];
  pageId: any;
  result: any = {};
  optionValues: any = {};

  constructor(private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration) { }

    icons:any ={
      // "pink":"https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
      "green":"https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      "red":"https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      // "blue":"https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      "yellow":"https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      // "orange":"https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
      // "cotton": {url:"../../../assets/images/marker/cotton.png", scaledSize: {height: 32,width: 32}}
    }

  setFarmerSubmit(submit: boolean) {
    this.isFarmerSubmit = submit;
  }

  getFarmerSubmit() {
    return this.isFarmerSubmit;
  }

  getDropdownDependency(url: string, params: any) {
    return this.commonHttpClientService.httpPost((url), params);
  }

  getFormFields(id: string) {
    return this.commonHttpClientService.httpGet((this.appConfiguration.getFarmerMenu + id));
  }

  addFarmerDetails = () => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.saveFarmerDetails, this.result);
  }

  getFarmerAggregate = ()=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getFarmerAggregate);
  }

  getFarmerDetail = ( id: string )=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getFarmerDetailInLocationPage + id)
  }

  setPage = (page: any) => this.pageId = page;

  getPage = () => this.pageId;

  setOptionValues = (optionValues: any) => this.optionValues = optionValues;
  getOptionValues = () => this.optionValues;

  getFarmLocationDetails = () =>{
    return {
      "cardData": [
        {
          "title": "Farmers",
          "count": 5,
          "icon": "assets/images/icons/farmers-ico.png"
        },
        {
          "title": "Plot",
          "count": 60,
          "icon": "assets/images/icons/plots-ico.png"
        },
        {
          "title": "Harvest (Ton)",
          "count": 5000,
          "icon": "assets/images/icons/harvest-ico.png"
        },
        {
          "title": "Calendar",
          "count": 100,
          "icon": "assets/images/icons/calendar-ico.png"
        }
      ],
      "farmerDetailData":[
        {
          "lat": 13.088989,
          "lng": 80.290194,
          "name": 'Vignesh',
          "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
          "draggable": false,
          "id":"vignesh",
          "farmer_id":"vignesh",
          "farmerDetail":{
            "phoneNumber":"+91 - 77086 90114",
            "farmerCode":"1002",
            "certificate":"Farmer Certificate",
            "farmerGroup":"Green Farm Group"
          },
          "plotInformation":{
            "icon":"assets/images/icons/plots-ico.png",
            "class":"crop-blk bg-light-grey align-items-center",
            "title":"Plot",
            "value":"11"
          },
          "currentCrop":{
            "icon":"assets/images/crops/crop-lg-wheat.png",
            "class":"crop-image colr1"
          },
          "currentSeason":{
            "icon":"assets/images/icons/crop-rabi-white-ico.png",
            "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
            "name":"Rabi"
         },
         "trainingHistory":[
           {
             "label":"Training Code",
             "value":"Tom Farming"
           },
           {
             "label":"Training Topic",
             "value":"Planting"
           }
         ],
         "userCrops": {
          "title": "More Crops",
          "cropArray": [
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/coffee-46x46.png"
            },
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/peas-46x46.png"
            },
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/capcicum-46x46.png"
            },
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/tomato-46x46.png"
            }
          ]
        },
         "tableData": [
          {
            "title": "Farmer Balance",
            "id": "headingOne",
            "tableData": [
              {
                "name": "Tomato",
                "quantity": "34 ton",
                "amount": "300"
              },
              {
                "name": "Rice",
                "quantity": "42 ton",
                "amount": "900"
              },
              {
                "name": "Corn",
                "quantity": "23 ton",
                "amount": "897"
              }
            ]
          },
          {
            "title": "Procurement",
            "id": "headingTwo",
            "tableData": [
              {
                "name": "Tomato",
                "quantity": "34 ton",
                "amount": "980"
              },
              {
                "name": "Rice",
                "quantity": "67 ton",
                "amount": "345"
              },
              {
                "name": "Corn",
                "quantity": "13 ton",
                "amount": "346"
              }
            ]
          },
          {
            "title": "Distribution",
            "id": "headingOne",
            "tableData": [
              {
                "name": "Tomato",
                "quantity": "35 ton",
                "amount": "450"
              },
              {
                "name": "Rice",
                "quantity": "59 ton",
                "amount": "678"
              },
              {
                "name": "Corn",
                "quantity": "21 ton",
                "amount": "500"
              }
            ]
          }
        ],
        "farmerFarmDetails":[
          {
            "class":"crop-blk bg-sowing align-items-center",
            "title":"Sowing Date",
            "value":"Sep 21, 2022",
            "icon":"assets/images/icons/crop-sowing-ico.png"
          },
           {
             "class":"crop-blk bg-harvest align-items-center",
             "title":"Harvest Date",
             "value":"Dec 12, 2022",
             "icon":"assets/images/icons/crop-hervest-ico.png"
            },
           {
             "class":"crop-blk bg-harvest align-items-center",
             "value":"39 Ha",
             "title":"Acre Area",
             "icon":"assets/images/icons/acre-ico.png"
            },
           {
             "class":"crop-blk bg-sowing align-items-center",
             "value":"2100kg",
             "title":"Est. Yeild",
             "icon":"assets/images/icons/harvest-hand-ico.png"
            }
        ],
          "farmerCrops":[
            {
              "class":"crop-blk colr-yellow",
              "icon":"assets/images/crops/crop-tomatoes.png",
              "title":"Tomato"
            },
            {
              "class":"crop-blk colr-green",
              "icon":"assets/images/crops/crop-yello-chilli.png",
              "title":"Yellow Chilli"
            },
          ],
        },

        {
          "lat": 15.179,
          "lng": 39.782,
          "name":"Arun",
          "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
          "draggable": false,
          "id":"arun",
          "farmer_id":"arun",
          "farmerDetail":{
            "phoneNumber":"+91 - 8934201111",
            "farmerCode":"12132",
            "certificate":"Farmer Certificate",
            "farmerGroup":"Farming Lions Group"
          },
         "currentSeason":{
            "icon":"assets/images/icons/crop-rabi-white-ico.png",
            "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
            "name":"Rabi"
        },
        "currentCrop":{
          "icon":"assets/images/crops/crop-lg-wheat.png",
          "class":"crop-image colr1"
        },
        "plotInformation":{
          "icon":"assets/images/icons/plots-ico.png",
          "class":"crop-blk bg-light-grey align-items-center",
          "title":"Plot",
          "value":"20"
        },
        "trainingHistory":[
          {
            "label":"Training Code",
            "value":"Training 1"
          },
          {
            "label":"Training Topic",
            "value":"Harvesting"
          }
        ],
         "userCrops": {
          "title": "More Crops",
          "cropArray": [
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/coffee-46x46.png"
            },
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/peas-46x46.png"
            },
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/capcicum-46x46.png"
            },
            {
              "class":"list-group-item",
              "icon":"assets/images/crops/tomato-46x46.png"
            }
          ]
        },
        "tableData": [
          {
            "title": "Farmer Balance",
            "id": "headingOne",
            "tableData": [
              {
                "name": "Wheat",
                "quantity": "28 ton",
                "amount": "789"
              },
              {
                "name": "Rice",
                "quantity": "52 ton",
                "amount": "817"
              },
              {
                "name": "Corn",
                "quantity": "14 ton",
                "amount": "611"
              }
            ]
          },
          {
            "title": "Procurement",
            "id": "headingTwo",
            "tableData": [
              {
                "name": "Wheat",
                "quantity": "28 ton",
                "amount": "789"
              },
              {
                "name": "Rice",
                "quantity": "52 ton",
                "amount": "817"
              },
              {
                "name": "Corn",
                "quantity": "14 ton",
                "amount": "611"
              }
            ]
          },
          {
            "title": "Distribution",
            "id": "headingOne",
            "tableData": [
              {
                "name": "Wheat",
                "quantity": "28 ton",
                "amount": "789"
              },
              {
                "name": "Rice",
                "quantity": "52 ton",
                "amount": "817"
              },
              {
                "name": "Corn",
                "quantity": "14 ton",
                "amount": "611"
              }
            ]
          }
        ],
        "farmerFarmDetails":[
          {
            "class":"crop-blk bg-sowing align-items-center",
            "title":"Sowing Date",
            "value":"May 2, 2020",
            "icon":"assets/images/icons/crop-sowing-ico.png"
          },
           {
             "class":"crop-blk bg-harvest align-items-center",
             "title":"Harvest Date",
             "value":"Aug 6, 2020",
             "icon":"assets/images/icons/crop-hervest-ico.png"
            },
           {
             "class":"crop-blk bg-harvest align-items-center",
             "value":"40 Ha",
             "title":"Acre Area",
             "icon":"assets/images/icons/acre-ico.png"
            },
           {
             "class":"crop-blk bg-sowing align-items-center",
             "value":"1000kg",
             "title":"Est. Yeild",
             "icon":"assets/images/icons/harvest-hand-ico.png"
            }
        ],
        "farmerCrops":[
            {
              "class":"crop-blk colr-yellow",
              "icon":"assets/images/crops/crop-wheat.png",
              "title":"Wheat"
            },
            {
              "class":"crop-blk colr-green",
              "icon":"assets/images/crops/crop-peas.png",
              "title":"Peas"
            },
          ],
        },


		 {
      "lat": 13.087951,
      "lng": 80.286538,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Land Plant"
      },
      {
        "label":"Training Topic",
        "value":"Farm Plant Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "30 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "90 ton",
            "amount": "580"
          },
          {
            "name": "Corn",
            "quantity": "39 ton",
            "amount": "670"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "45 ton",
            "amount": "654"
          },
          {
            "name": "Rice",
            "quantity": "32 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "12 ton",
            "amount": "341"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"June 25, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 9, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"80 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"3000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-ladyfinger.png",
          "title":"Ladies Finger"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Tom Farming"
       },
       {
         "label":"Training Topic",
         "value":"Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-tomatoes.png",
          "title":"Tomato"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
      ],
    },

    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },


		 {
      "lat": 13.087951,
      "lng": 80.286538,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Land Plant"
      },
      {
        "label":"Training Topic",
        "value":"Farm Plant Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "30 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "90 ton",
            "amount": "580"
          },
          {
            "name": "Corn",
            "quantity": "39 ton",
            "amount": "670"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "45 ton",
            "amount": "654"
          },
          {
            "name": "Rice",
            "quantity": "32 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "12 ton",
            "amount": "341"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"June 25, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 9, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"80 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"3000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-ladyfinger.png",
          "title":"Ladies Finger"
        },
      ],
    },


    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Rabis & co Farm"
       },
       {
         "label":"Training Topic",
         "value":"Harvest Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Wheat",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
      ],
    },


    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Tom Farming"
       },
       {
         "label":"Training Topic",
         "value":"Planting Farm"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-tomatoes.png",
          "title":"Tomato"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Rabis & co Farm"
       },
       {
         "label":"Training Topic",
         "value":"Harvest Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Wheat",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
      ],
    },

    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Rabis & co Farm"
       },
       {
         "label":"Training Topic",
         "value":"Harvest Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Wheat",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Tom Farming"
       },
       {
         "label":"Training Topic",
         "value":"Planting Farm"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-tomatoes.png",
          "title":"Tomato"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Rabis & co Farm"
       },
       {
         "label":"Training Topic",
         "value":"Harvest Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Wheat",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
      ],
    },


    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Rabis & co Farm"
       },
       {
         "label":"Training Topic",
         "value":"Harvest Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Wheat",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Tom Farming"
       },
       {
         "label":"Training Topic",
         "value":"Planting Farm"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-tomatoes.png",
          "title":"Tomato"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Rabis & co Farm"
       },
       {
         "label":"Training Topic",
         "value":"Harvest Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Wheat",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
      ],
    },
		 {
      "lat": 13.087951,
      "lng": 80.286538,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Land Plant"
      },
      {
        "label":"Training Topic",
        "value":"Farm Plant Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "30 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "90 ton",
            "amount": "580"
          },
          {
            "name": "Corn",
            "quantity": "39 ton",
            "amount": "670"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "45 ton",
            "amount": "654"
          },
          {
            "name": "Rice",
            "quantity": "32 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "12 ton",
            "amount": "341"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"June 25, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 9, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"80 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"3000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-ladyfinger.png",
          "title":"Ladies Finger"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Rabis & co Farm"
       },
       {
         "label":"Training Topic",
         "value":"Harvest Planting"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Wheat",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
      ],
    },
    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Tom Farming"
       },
       {
         "label":"Training Topic",
         "value":"Planting Farm"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-tomatoes.png",
          "title":"Tomato"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
      ],
    },

    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },

    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },


		 {
      "lat": 13.087951,
      "lng": 80.286538,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Land Plant"
      },
      {
        "label":"Training Topic",
        "value":"Farm Plant Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "30 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "90 ton",
            "amount": "580"
          },
          {
            "name": "Corn",
            "quantity": "39 ton",
            "amount": "670"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "45 ton",
            "amount": "654"
          },
          {
            "name": "Rice",
            "quantity": "32 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "12 ton",
            "amount": "341"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"June 25, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 9, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"80 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"3000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-ladyfinger.png",
          "title":"Ladies Finger"
        },
      ],
    },

    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },

    {
      "lat": 13.088989,
      "lng": 80.290194,
      "name": 'Vignesh',
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"vignesh",
      "farmer_id":"vignesh",
      "farmerDetail":{
        "phoneNumber":"+91 - 77086 90114",
        "farmerCode":"1002",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Green Farm Group"
      },
      "plotInformation":{
        "icon":"assets/images/icons/plots-ico.png",
        "class":"crop-blk bg-light-grey align-items-center",
        "title":"Plot",
        "value":"11"
      },
      "currentCrop":{
        "icon":"assets/images/crops/crop-lg-wheat.png",
        "class":"crop-image colr1"
      },
      "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
     },
     "trainingHistory":[
       {
         "label":"Training Code",
         "value":"Tom Farming"
       },
       {
         "label":"Training Topic",
         "value":"Planting Farm"
       }
     ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
     "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "300"
          },
          {
            "name": "Rice",
            "quantity": "42 ton",
            "amount": "900"
          },
          {
            "name": "Corn",
            "quantity": "23 ton",
            "amount": "897"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "34 ton",
            "amount": "980"
          },
          {
            "name": "Rice",
            "quantity": "67 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "13 ton",
            "amount": "346"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Tomato",
            "quantity": "35 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "59 ton",
            "amount": "678"
          },
          {
            "name": "Corn",
            "quantity": "21 ton",
            "amount": "500"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"Sep 21, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Dec 12, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"39 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"2100kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
      "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-tomatoes.png",
          "title":"Tomato"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"Yellow Chilli"
        },
      ],
    },

    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },

    {
      "lat": 15.179,
      "lng": 39.782,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Training 1"
      },
      {
        "label":"Training Topic",
        "value":"Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Wheat",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"May 2, 2020",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 6, 2020",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"40 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"1000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-wheat.png",
          "title":"Wheat"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-peas.png",
          "title":"Peas"
        },
      ],
    },

    {
      "lat": 13.087951,
      "lng": 80.286538,
      "name":"Arun",
      "profileImage": 'assets/images/icons/user-payment-accordion-ico.png',
      "draggable": false,
      "id":"arun",
      "farmer_id":"arun",
      "farmerDetail":{
        "phoneNumber":"+91 - 8934201111",
        "farmerCode":"12132",
        "certificate":"Farmer Certificate",
        "farmerGroup":"Farming Lions Group"
      },
     "currentSeason":{
        "icon":"assets/images/icons/crop-rabi-white-ico.png",
        "invertedIcon":"assets/images/icons/crop-rabi-ico.png",
        "name":"Rabi"
    },
    "currentCrop":{
      "icon":"assets/images/crops/crop-lg-wheat.png",
      "class":"crop-image colr1"
    },
    "plotInformation":{
      "icon":"assets/images/icons/plots-ico.png",
      "class":"crop-blk bg-light-grey align-items-center",
      "title":"Plot",
      "value":"20"
    },
    "trainingHistory":[
      {
        "label":"Training Code",
        "value":"Land Plant"
      },
      {
        "label":"Training Topic",
        "value":"Farm Plant Harvesting"
      }
    ],
     "userCrops": {
      "title": "More Crops",
      "cropArray": [
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/coffee-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/peas-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/capcicum-46x46.png"
        },
        {
          "class":"list-group-item",
          "icon":"assets/images/crops/tomato-46x46.png"
        }
      ]
    },
    "tableData": [
      {
        "title": "Farmer Balance",
        "id": "headingOne",
        "tableData": [
          {
            "name": "Yellow Chilli",
            "quantity": "28 ton",
            "amount": "789"
          },
          {
            "name": "Rice",
            "quantity": "52 ton",
            "amount": "817"
          },
          {
            "name": "Corn",
            "quantity": "14 ton",
            "amount": "611"
          }
        ]
      },
      {
        "title": "Procurement",
        "id": "headingTwo",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "30 ton",
            "amount": "450"
          },
          {
            "name": "Rice",
            "quantity": "90 ton",
            "amount": "580"
          },
          {
            "name": "Corn",
            "quantity": "39 ton",
            "amount": "670"
          }
        ]
      },
      {
        "title": "Distribution",
        "id": "headingOne",
        "tableData": [
          {
            "name": "LadyFinger",
            "quantity": "45 ton",
            "amount": "654"
          },
          {
            "name": "Rice",
            "quantity": "32 ton",
            "amount": "345"
          },
          {
            "name": "Corn",
            "quantity": "12 ton",
            "amount": "341"
          }
        ]
      }
    ],
    "farmerFarmDetails":[
      {
        "class":"crop-blk bg-sowing align-items-center",
        "title":"Sowing Date",
        "value":"June 25, 2022",
        "icon":"assets/images/icons/crop-sowing-ico.png"
      },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "title":"Harvest Date",
         "value":"Aug 9, 2022",
         "icon":"assets/images/icons/crop-hervest-ico.png"
        },
       {
         "class":"crop-blk bg-harvest align-items-center",
         "value":"80 Ha",
         "title":"Acre Area",
         "icon":"assets/images/icons/acre-ico.png"
        },
       {
         "class":"crop-blk bg-sowing align-items-center",
         "value":"3000kg",
         "title":"Est. Yeild",
         "icon":"assets/images/icons/harvest-hand-ico.png"
        }
    ],
    "farmerCrops":[
        {
          "class":"crop-blk colr-yellow",
          "icon":"assets/images/crops/crop-yello-chilli.png",
          "title":"yellow Chilli"
        },
        {
          "class":"crop-blk colr-green",
          "icon":"assets/images/crops/crop-ladyfinger.png",
          "title":"Ladies Finger"
        },
      ],
    }

   ],
  };
  }

  setPageResult = (result: any) => this.result = result;

  getPageResult = () => this.result;


}
