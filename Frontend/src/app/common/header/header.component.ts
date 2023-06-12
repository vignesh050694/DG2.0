import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { OrganizationService } from '../../components/settings/organization/organization.service';
import { ResponseModalService } from '../response-modal/response-modal.service';

@Component({
  selector: 'sourcetrace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  organizations: any[] = [];
  constructor(
    private organizationService: OrganizationService,
    private responceModalService:ResponseModalService,
     private router: Router,
     private keycloakSevice:KeycloakService) {

  }

  ngOnInit(): void {
    this.organizationService.getAllOrganization().subscribe((data: any[]) => {
      this.organizations = data;
    });
  }
  onOrganizationChange = (id) => {
    //TODO
  }


  logout(){
    localStorage.clear();
    this.keycloakSevice.logout();
  }
}
