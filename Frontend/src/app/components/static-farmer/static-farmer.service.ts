 import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class StaticFarmerService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getFarmer = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getFarmer, data);
  }

  getFarmsByFarmerId = (id: any) =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getFarmByFarmerId + id);
  }
  
  getLoansByFarmerId = (id: any) =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getLoanDetailsByFarmerId + id);
  }
  

  getCoordinatesByFarmId = (id: any) =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCoordinatesByFarm + id);
  }

  addFarmer = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addFarmer, data);
  }

  getFarmerById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getFarmerById + id);
  }

  deleteFarmer = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteFarmer + id);
  }
  getAllFarmer = (filter: any[]) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.getAllFarmer, filter);
  }
  getAllFarmers = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllFarmer);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  imageUpload=(file:any)=>{
     return this.commonHttpClientService.uploadFile(file);
  }

  getFarmerCoordinates=(filters:any)=>{
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCoordinates,filters);
  }

  getSowingsByFarmer = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getSowingsByFarmer + id);
  }

  getDropFarmers = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getDropFarmers);
  }

  // getImageById=(id:any)=>{
  //   return this.commonHttpClientService.getFile(this.appConfiguration.getImage + id);
  // }

  getFileUploader=()=>{
   return  new FileUploader({
      url: "",
      disableMultipart : false,
      autoUpload: false,
      method: 'post',
      itemAlias: 'file',
      allowedFileType: ['image'],
      queueLimit: 1
    });
  }
}
