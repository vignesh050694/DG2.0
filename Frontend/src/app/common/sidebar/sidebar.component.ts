import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { navItems, navProdItems } from './nav';
import { environment } from '../../../environments/environment'
import { NavServiceService } from '../../common/sidebar/nav-service.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private navServiceService: NavServiceService) {
    /*this.navItems = JSON.parse(localStorage.getItem('menuData'));*/
    this.navItems = navProdItems;
  }
  navItems: any[] = [];
  currentUrl: String = '';
  data = [{
    "key": "parent",
    "operation": "NULL",
    "value": null
  }
  ];
  childData = [];
  tab_pane_id: any;
  ngOnInit(): void {
    //this.navServiceService.getMenu(this.data).subscribe((menu: any[]) => {
    //  this.navItems = menu;
    //});
    $(document).ready(function ($) {
      $('.sidebarcollapse').click(function () {
        $('body').toggleClass('pr-sidebar-active');
        if ($('body').hasClass('pr-sidebar-active')) {
          // alert('has active');
        } else {
          // alert('not active');
          $('.pr-sidebar-tabcontent .tab-content > .tab-pane').removeClass(
            'active show'
          );
          $('body').removeClass('pr-sec-sidebar-active');
          //$('body').addClass('pr-sec-sidebar-active');
        }
      });
      $('.pr-sidebar .pr-sidebar-nav .nav-link').on('click', function () {
        var tab_id = $(this).attr('id');
        this.tab_pane_id = '#' + tab_id.substring(0, tab_id.length - 4);
        // alert(tab_pane_id);
        if ($('body').hasClass('pr-sec-sidebar-active')) {
          $('.pr-sidebar-tabcontent .tab-content > .tab-pane').removeClass(
            'active show'
          );
        } else {
          $('.pr-sidebar-tabcontent .tab-content > .tab-pane').removeClass(
            'active show'
          );
          $(this.tab_pane_id).toggleClass('active show');
        }
        if ($('body').hasClass('pr-sidebar-active')) {
          $('body').toggleClass('pr-sec-sidebar-active');

        } else {
          $('body').addClass('pr-sidebar-active');
          $('body').toggleClass('pr-sec-sidebar-active');

        }
      });
      //$('.tab-content-header .bck-bttn').on('click', function () {
      //  $('body').addClass('pr-sec-sidebar-active');
      //  $(this).parents('.tab-pane').removeClass('active show');

      //});
    });
    this.currentUrl = window.location.href;
    this.navItems.forEach((item) => {
      if (this.currentUrl.includes(item.link)) {
        $('#' + item.id + '-tab').add('active');
      }

    });
  }
  selectedTab = (childData) => {
    this.childData = childData;
  }
  collapsePanel = (id, canActive) => {
    $(document).ready(function ($) {
      $('.pr-sidebar-tabcontent .tab-content > .tab-pane').removeClass(
        'active show'
      );
      $(this.tab_pane_id).addClass('active show');
      $('body').removeClass('pr-sec-sidebar-active');
      if (!canActive)
        $('#' + id + '-tab').removeClass('active');
    });
  }
  onMainMenuClicked(id) {
    this.navItems.forEach((item) => {
      $('#' + item.id + '-tab').removeClass('active');
    });
    $('#' + id + '-tab').addClass('active');
  }
}
