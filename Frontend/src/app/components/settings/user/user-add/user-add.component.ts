import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { OrganizationService } from '../../organization/organization.service';
import { RoleService } from '../../role/role.service';
import { AdminService } from 'src/app/account/admin.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  isSubmit: boolean = false;
  languages: any[] = [];
  subOrganizations: any[] = [];
  roles: any[] = [];
  allowedMimeType = ['image/png', 'image/jpeg']
  maxFileSize = 0.5 * 1024 * 1024;
  imageUrl: string = '';
  showPassword: boolean = false;
  id: string;
  selectedSubOrganization: any;
  selectedRole: any;
  isPasswordError: boolean = false;
  isConfirmPasswordError: boolean = false;
  token = localStorage.getItem("generatedToken");
  private uploadtrigger: EventEmitter<any> = new EventEmitter();
  constructor(
    public formBuilder: FormBuilder,
    private responseModalService: ResponseModalService,
    private route: ActivatedRoute,
    private userService: UserService,
    private appConfiguration: AppConfiguration,
    private router: Router,
    private organizationService: OrganizationService,
    private roleService: RoleService
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.presetData();
    this.getOrganisations();
    //this.getRoles();
  }

  //to check the form data and Assinging values
  createForm = () => {
    this.userForm = this.formBuilder.group({
      subOrganization: [''],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      language: ['', Validators.required],
      photo: [''],
      address: [''],
      phoneNumber: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      mobileNumber: ['',[Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      setPassword: [''],
      isActive: [false],
      role: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }

  //to edit the data for already saved user
  presetData = () => {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.userService.getUserById(this.id).subscribe((data: any) => {
        this.id = data?.id;
        this.selectedRole = data?.role;
        this.selectedSubOrganization = data?.subOrganization;
        this.showPassword = data?.isActive;
        this.userForm = this.formBuilder.group({
          subOrganization: [this.selectedSubOrganization],
          userName: [data?.userName],
          firstName: [data?.firstName],
          lastName: [data?.lastName],
          language: [data?.language],
          address: [data?.address],
          phoneNumber: [data?.phoneNumber],
          mobileNumber: [data?.mobileNumber],
          email: [data?.email],
          setPassword: [data?.isActive],
          isActive: [data?.isActive],
          role: [this.selectedRole],
          password: [data?.password],
          confirmPassword: [data?.password],
        });
      })
    }
  }

  getOrganisations = () =>{
    this.organizationService.getAllOrganization().subscribe((data:any[])=>{
      this.subOrganizations = data;
    })
  }

  getRoles = () =>{
    this.roleService.getAllRoles().subscribe((data:any[])=>{
      this.roles = data;
    })
  }

  //save
  submitForm = () => {
    this.isSubmit = true;
    this.userForm.patchValue({
        subOrganization: this.selectedSubOrganization,
        role:this.selectedRole
      })
    if (this.showPassword == true) {
      if (this.userForm.value.password == "") {
        this.isPasswordError = true;
      }
      if (this.userForm.value.confirmPassword == "") {
        this.isConfirmPasswordError = true;
        return;
      }
    }
    if (this.imageUrl == "") {
      this.uploadtrigger.emit();
    }
    else if (this.imageUrl != "") {
      this.sendForms();
    }
  }


  //to upload image
  onUploadComplete = (event) => {
    this.imageUrl = event.url;
    this.sendForms();
  }

  //to save the inputs entered by User
  sendForms = () => {
    let userData = this.userForm.value;
    userData.photo = this.imageUrl;
    this.userService.addUser(userData,this.token).subscribe((data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'User Added', 'Your information has been saved successfully!');
    });
  }

  //to search
  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }
  get basic() {
    return this.userForm.controls;
  }
  onSetPasswordChange = (event) => {
    this.showPassword = event;
  }
  cancel = () => {
    this.router.navigate(['/settings/user']);
  }
  onPasswordChange = () => {
    if (this.showPassword == true) {
      if (this.userForm.value.password != "") {
        this.isPasswordError = false;
      }
      if (this.userForm.value.confirmPassword != "") {
        this.isConfirmPasswordError = false;
        return;
      }
    }
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
