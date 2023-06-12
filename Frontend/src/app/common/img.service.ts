import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppConfiguration } from './App.configuration';
import { CommonHttpClientService } from './commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

constructor(private commonHttpClientService :CommonHttpClientService,private appConfiguration:AppConfiguration) { }

  toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  toFile=(blob:Blob,name:any,type:any)=>{
  let fileName = name;
  let file = new File([blob], fileName,{type:type, lastModified:new Date().getTime()});
  let container = new DataTransfer();
  container.items.add(file);
  return container.files;
  }

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

   getSelectedImage=(fileUploader:FileUploader,event:any)=>{
     let imageUrl = "";
     if(fileUploader.queue.length > 1){
       fileUploader.removeFromQueue(fileUploader.queue[0]);
     }
     let selectedImage = event[0];
     if(selectedImage !=undefined){
       const blob = new Blob([selectedImage], { type: selectedImage.type });
       imageUrl = window.URL.createObjectURL(blob);
     }
     return {"uploader":fileUploader,"image":selectedImage,"url":imageUrl};
   }

   getImageById=(id:any)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getImage + id);
  }

}
