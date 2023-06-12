import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoleService } from '../role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../common/App.configuration';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  parentMenus: any[] = [];
  selectedParentMenu = "";
  roleName: string = "";
  roleId: string = "";
  isAdmin: boolean = false;
  menu: any = {};
  displayedColumns: string[] = ['Role Menu','create','list','edit','delete','Select All'];
  rows = new MatTableDataSource([]);
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number;
  isRoleCheckBoxChange: boolean = false;

  constructor(private roleService: RoleService, private router: Router, private route: ActivatedRoute,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) { }

  ngOnInit(): void {
    this.getParentMenu();
  }
  getParentMenu() {
    this.roleService.getParentMenu().subscribe((data: any[]) => {
      this.parentMenus = data;
    })
  }
  onPaginate = (pageEvent: PageEvent) => {
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    let pageObject = { postPerPage: this.postPerPage, pageNumber: this.pageNumber };
  };
  onSave = () => {
    this.onSubmit();
    this.goToList();
  }
  onSubmit = () => {
    this.isRoleCheckBoxChange = false;
    if (this.roleId != "") {
      this.menu.role.id = this.roleId;
    }
    this.menu.role.name = this.roleName;
    this.menu.role.isAdmin = this.isAdmin;
    this.roleService.saveRole(this.menu).subscribe((data: any) => {
      this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
        'Role Added', 'Your information has been saved successfully!');
      this.roleId = data?.role?.id;
    });
  }
  changeRoleMenu = (event) => {
    if (this.isRoleCheckBoxChange) {
      var answer = window.confirm("Save data?");
      if (answer) {
        this.onSubmit();
      }
    }
    this.roleService.getRoleMenu(event?.value?.id, this.roleId).subscribe((data: any) => {
      this.menu = data;
      this.rows.data = this.menu.menus;
      this.count = this.menu.menus.length;
    })
  }

  onCheckBoxChange = (event,i) => {
    console.log(event);
    this.menu!.menus[i]!.scopes['' + event.target.name] = event.target.checked;
    if (!event.target.checked) {
      $('#' + this.menu?.menus[i]?.id + '_selectAll').prop('checked', event.target.checked);
    }
    else {
      if ($('#' + this.menu?.menus[i]?.id + '_' + this.displayedColumns[1]).is(":checked") &&
        $('#' + this.menu?.menus[i]?.id + '_' + this.displayedColumns[2]).is(":checked") &&
        $('#' + this.menu?.menus[i]?.id + '_' + this.displayedColumns[3]).is(":checked") &&
        $('#' + this.menu?.menus[i]?.id + '_' + this.displayedColumns[4]).is(":checked"))
        $('#' + this.menu?.menus[i]?.id + '_selectAll').prop('checked', true);
    }
    this.isRoleCheckBoxChange = true;
  }
  onSelectAllCheckBoxChange = (event, index) => {
    this.menu!.menus[index]!.scopes[this.menu?.menus[index]?.id + this.displayedColumns[1]] = event.target.checked;
    this.menu!.menus[index]!.scopes[this.menu?.menus[index]?.id + this.displayedColumns[2]] = event.target.checked;
    this.menu!.menus[index]!.scopes[this.menu?.menus[index]?.id + this.displayedColumns[3]] = event.target.checked;
    this.menu!.menus[index]!.scopes[this.menu?.menus[index]?.id + this.displayedColumns[4]] = event.target.checked;
    $('#' + this.menu?.menus[index]?.id + '_' + this.displayedColumns[1]).prop('checked', event.target.checked);
    $('#' + this.menu?.menus[index]?.id + '_' + this.displayedColumns[2]).prop('checked', event.target.checked);
    $('#' + this.menu?.menus[index]?.id + '_' + this.displayedColumns[3]).prop('checked', event.target.checked);
    $('#' + this.menu?.menus[index]?.id + '_' + this.displayedColumns[4]).prop('checked', event.target.checked);
  }
  goToList = () => {
    this.router.navigate(['settings/role']);
  }
}
