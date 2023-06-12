import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { CatalougeTypes } from 'src/app/common/common.enum';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.scss']
})
export class EquipmentDetailComponent implements OnInit {

  isSubmit: boolean;
  farmInformationForm:FormGroup;
  id: string;
  title: string;
  selectedFarmType:any;
  farmTypes =[];
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,private catalogueService:CatalogueService) {
  }

  getFarmEquipmentsTypes=()=>{
    this.catalogueService.getCataloguesByType(CatalougeTypes.farmEquipments).toPromise().then((data:any)=>{
      this.farmTypes = data;
    })
  }

  ngOnInit(): void {
    this.getFarmEquipmentsTypes();
    this.title = this.data?.title;
    this.farmInformationForm = this.formBuilder.group({
      vehicleType: [''],
      vehicleCount: ['', [Validators.required]]

    });

    this.isSubmit = false;
  }
  save = () => {
    this.isSubmit = true;
    this.farmInformationForm.patchValue({
      vehicleType :this.selectedFarmType
    })
    let farmData = this.farmInformationForm?.value;
    if (this.id) {
      farmData['id'] = this.id;
    }else{
      farmData['id'] = "temp"+ Guid.create();
    }
    this.dialogRef.close(farmData);
  };

  get basic() {
    return this.farmInformationForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(null);
  }

}
