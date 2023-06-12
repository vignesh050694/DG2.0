import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router) { }
  getToken() {
    let userCred = JSON.parse(localStorage.getItem("user-cred"));
    if (userCred && userCred?.userName == "vvignesh" && userCred?.password == "12345678") {
      return true;
    }
    return false;
  }

  setToken(userCred:any) {
    localStorage.setItem("user-cred",userCred);
  }
}
