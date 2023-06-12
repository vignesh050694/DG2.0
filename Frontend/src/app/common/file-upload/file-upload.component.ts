import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { AppConfiguration } from '../App.configuration';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonHttpClientService } from '../commonHttpService';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  uploader: FileUploader;
  basicsubmit: boolean = false;
  url: string;
  @Input() allowedMimeType;
  @Input() maxFileSize;
  @Output() onUploadComplete = new EventEmitter();
  @Input() private uploadtrigger: EventEmitter<any>;
  @Output() onError = new EventEmitter();
  errorMessageText: string = "";
  file: any = null;
  uploadForm: FormGroup;
  private cd: ChangeDetectorRef

  constructor(private appConfiguration: AppConfiguration, private _formBuilder: FormBuilder, private commonHttpService: CommonHttpClientService) {
    this.url = "http://5k-car-care-572197221.ap-south-1.elb.amazonaws.com/master/api/v1/upload/file";
  }
  ngOnInit() {
    this.uploadForm = this._formBuilder.group({
      file: ['', [Validators.required]],
    });
    if (this.uploadtrigger) {
      this.uploadtrigger.subscribe(data => {
        this.basicsubmit = true;
          let body = new FormData();
          body.append("file", this.file);
        const formData = this.uploadForm.value;
        if (this.file != null) {
          this.commonHttpService.uploadFile(body).subscribe((data: Response) => {
            this.onUploadComplete.emit(data);
          });
        }
      });
    }
    this.uploader = new FileUploader({
      url: this.url,
      disableMultipart: false,
      autoUpload: false,
      method: 'post',
      itemAlias: 'file',
      allowedMimeType: this.allowedMimeType,
      maxFileSize: this.maxFileSize,
      queueLimit: 1
    });
    this.uploader.onAfterAddingFile = f => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
  }
  onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) =>{
    switch (filter.name) {
      case 'fileSize':
        this.errorMessageText = `Maximum upload size exceeded (${item.size} of ${this.maxFileSize} allowed)`;
        break;
      case 'mimeType':
        const allowedTypes = this.allowedMimeType.join();
        this.errorMessageText = `Type "${item.type} is not allowed. Allowed types: "${allowedTypes}"`;
        break;
      default:
        this.errorMessageText = `Unknown error (filter is ${filter.name})`;
    }

  }
  onFileChange = (event) => {
    this.basicsubmit = true;
    let body = new FormData();
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        body.append("file", this.file);
        const formData = this.uploadForm.value;
        if (this.file != null) {
          //To remove
          this.onUploadComplete.emit("https://picsum.photos/200/300");
          this.commonHttpService.uploadFile(body).subscribe((data: Response) => {
            this.onUploadComplete.emit(data);
          });
        }
        this.uploadForm.patchValue({
          file: reader.result,
        });
      };
    }
  }
  get basic() {
    return this.uploadForm.controls;
  }
  onFileClick = () => {
    this.basicsubmit = true;
  }
}
