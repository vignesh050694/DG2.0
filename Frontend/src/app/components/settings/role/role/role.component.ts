import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { RoleAddComponent } from '../role-add/role-add.component';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  //Trigger reload to list
  roleReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Role";                  //To set the title for page header
  buttonText: string = "Add Role";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }
  add = () => {
    this.router.navigate(['settings/role/role-add']);
  }
  emitEventToReload = () => {
    this.roleReloadEvent.next();
  }
  edit = (rowId: any) => {
    
  }
  search = (text) => {
    this.roleReloadEvent.next(text);
  }
}
