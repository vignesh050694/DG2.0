import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { UserService } from 'src/app/components/settings/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  generatedToken: any;

  constructor(public formBuilder: FormBuilder,
    private userService: UserService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  submit() {
    if (this.loginForm.valid) {
      this.generatedToken = this.loginForm.value.userName + this.loginForm.value.password;
      let loginData = this.loginForm?.value;
      
        this.userService.checkValidLogin(loginData).subscribe((data: any) => {
          localStorage.setItem("token", data?.token);
          this.router.navigate(['dashboard']);
        })
     
    }
  }

  get basic() {
    return this.loginForm.controls;
  }



}


