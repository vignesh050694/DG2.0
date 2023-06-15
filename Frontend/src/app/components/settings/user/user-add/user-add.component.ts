import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { OrganizationService } from '../../organization/organization.service';
import { RoleService } from '../../role/role.service';
import { StaticFarmerService } from 'src/app/components/static-farmer/static-farmer.service';
import { ImgService } from 'src/app/common/img.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  isSubmit: boolean = false;
  languages: any[] = [];
  subOrganizations: any;
  roles: any;
  allowedMimeType = ['image/png', 'image/jpeg'];
  maxFileSize = 0.5 * 1024 * 1024;
  imageUrl: string = '';
  selectedImage: File;
  imageId: any;
  selectedRole: any;
  selectedSubOrganization: any;
  public uploader: FileUploader = this.farmerService.getFileUploader();
  showPassword: boolean = false;
  id: any;
  isPasswordError: boolean = false;
  isConfirmPasswordError: boolean = false;
  token = localStorage.getItem('generatedToken');

  constructor(
    public formBuilder: FormBuilder,
    private responseModalService: ResponseModalService,
    private route: ActivatedRoute,
    private userService: UserService,
    private appConfiguration: AppConfiguration,
    private router: Router,
    private organizationService: OrganizationService,
    private roleService: RoleService,
    private farmerService: StaticFarmerService,
    private imgService: ImgService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.createForm();

   this.getOrganizations();
    this.getRoles();
    this.presetData();
  }

  // to check the form data and assigning values
  createForm(): void {
    this.userForm = this.formBuilder.group(
      {
        id: [''],
        subOrganization: [''],
        userName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: [''],
        language: ['', Validators.required],
        photo: [''],
        address: [''],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        mobileNo: ['', [Validators.pattern('[0-9]{10}')]],
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

  // to edit the data for already saved user
  presetData(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.userService.getUserById(this.id).subscribe((data: any) => {
        this.id = data?.id;
        this.showPassword = data?.isActive;
        this.selectedRole =data?.role;
        this.selectedSubOrganization= data?.subOrganization;
        this.userForm.patchValue({
          subOrganization: data?.subOrganization,
          userName: data?.userName,
          firstName: data?.firstName,
          lastName: data?.lastName,
          language: data?.language,
          address: data?.address,
          phoneNumber: data?.phoneNumber,
          mobileNo: data?.mobileNo,
          email: data?.email,
          setPassword: data?.isActive,
          isActive: data?.isActive,
          role: data?.role,
          password: data?.password,
          confirmPassword: data?.password,
        });
        console.log("this.selectedSubOrganization:"+this.selectedSubOrganization);
      });
    }
  }

  getOrganizations(): void {
    this.organizationService.getAllOrganization().subscribe((data: any[]) => {
      this.subOrganizations = data;
    });
  }

  getRoles(): void {
    this.roleService.getAllRoles().subscribe((data: any[]) => {
      this.roles = data;
    });
  }

  // save
  submitForm(): void {
    this.isSubmit = true;

    this.userForm.patchValue({
      subOrganization: this.selectedSubOrganization,
      role: this.selectedRole
    });

    if (this.showPassword) {
      if (this.userForm.value.password === '') {
        this.isPasswordError = true;
      }
      if (this.userForm.value.confirmPassword === '') {
        this.isConfirmPasswordError = true;
        return;
      }
    }

    this.sendForms();
  }

  public onUploadComplete(event: any): void {
    const result = this.imgService.getSelectedImage(this.uploader, event);
    this.uploader = result?.uploader;
    this.selectedImage = result?.image;
    this.imageUrl = result?.url;
  }

  async saveImages(): Promise<boolean> {
    try {
      const fd = new FormData();
      fd.append('image', this.selectedImage);
      if (this.selectedImage) {
        await this.farmerService.imageUpload(fd).toPromise().then((data) => {
          this.imageId = data?.id;
        });
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  // to save the inputs entered by User
  async sendForms(): Promise<void> {
    alert(this.userForm.valid);
    if (!this.userForm.invalid) {
    const isComplete = await this.saveImages();

    let userData = this.userForm.value;

    if (isComplete) {
      userData = {
        ...userData,
        photo: this.imageId
      };
    }
    if (this.id) {
      userData = {
        ...userData,
        id: this.id
      };
    }

    this.userService.addUser(userData, this.token).subscribe(
      (data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(
          this.appConfiguration.successIconUrl,
          'User Added',
          'Your information has been saved successfully!'
        );
      },
      (error: any) => {
        // Handle error here
      }
    );

    }else {
      // Mark all fields as touched to trigger validation messages
      this.getInvalidFields();
    }
  }

  // to search
  objectComparisonFunction(option, value): boolean {
    return option.id === value.id;
  }

  get basic() {
    return this.userForm.controls;
  }

  onSetPasswordChange(event): void {
    this.showPassword = event;
  }

  cancel(): void {
    this.router.navigate(['/settings/user']);
  }

  onPasswordChange(): void {
    if (this.showPassword) {
      if (this.userForm.value.password !== '') {
        this.isPasswordError = false;
      }
      if (this.userForm.value.confirmPassword !== '') {
        this.isConfirmPasswordError = false;
      }
    }
  }

  getInvalidFields(): string[] {
    const invalidFields: string[] = [];
  
    Object.keys(this.userForm.controls).forEach((fieldName: string) => {
      const control = this.userForm.get(fieldName);
      if (control.invalid && control.errors ) {
        invalidFields.push(fieldName);
        console.log(fieldName);
      }
    });
  
    return invalidFields;
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
      matchingControl.setErrors({ passwordMismatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };



}
