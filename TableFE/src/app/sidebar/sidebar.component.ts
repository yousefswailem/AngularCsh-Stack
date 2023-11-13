import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(public sidebarservice: SidebarService) {
   }

  ngOnInit() {
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
