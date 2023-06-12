import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { CatalougeTypes } from 'src/app/common/common.enum';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  isSubmit: boolean;
  animalInformationForm:FormGroup;
  id: string;
  title: string;
  selectedAnimalName:any;
  selectedFodder:any;
  selectedHousingType:any;
  animalNames =[];
  fodderTypes=[];
  housingTypes=[];

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,private catalogueService:CatalogueService) {
  }

  getAnimalNames=()=>{
    this.catalogueService.getCataloguesByType(CatalougeTypes.animalHusbandry).toPromise().then((data:any)=>{
      this.animalNames = data;
    })
  }

  getFodderTypes=()=>{
    this.catalogueService.getCataloguesByType(CatalougeTypes.fodder).toPromise().then((data:any)=>{
       this.fodderTypes=data;
    })
  }

  getHousingTypes=()=>{
    this.catalogueService.getCataloguesByType(CatalougeTypes.animalHousing).toPromise().then((data:any)=>{
      this.housingTypes=data;
    })
  }

  ngOnInit(): void {
    this.getAnimalNames();
    this.getFodderTypes();
    this.getHousingTypes();
    this.title = this.data?.title;
    this.animalInformationForm = this.formBuilder.group({
      animalType: ['' , [Validators.required]],
      animalCount: ['', [Validators.required]],
      foodType: ['',[Validators.required]],
      breedName: ['',[Validators.required]],
      houseType:['' , [Validators.required]],
      revenue:['' , [Validators.required]],

    });

    this.isSubmit = false;
  }
  submitForm2= () => {
    this.isSubmit = true;
    this.animalInformationForm.patchValue({
      animalType :this.selectedAnimalName,
      foodType :this.selectedAnimalName,
      houseType :this.selectedHousingType
    })
    let animalsData = this.animalInformationForm?.value;
    if (this.id) {
      animalsData['id'] = this.id;
    }else{
      animalsData['id'] = "temp"+ Guid.create();
    }
    this.dialogRef.close(animalsData);
  };

  get basic() {
    return this.animalInformationForm.controls;
  }


  cancel = () => {
    this.dialogRef.close(null);
  }

}
