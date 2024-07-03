import { Component, OnInit } from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserComponentComponent } from '../user-component.component';

@Component({
    selector: 'app-user-cart',
    standalone: true,
    templateUrl: './user-cart.component.html',
    styleUrl: './user-cart.component.css',
    imports: [UserNavbarComponent, CommonModule, RouterOutlet, UserComponentComponent]
})
export class UserCartComponent  implements OnInit{
  item: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() : void{
    this.route.queryParams.subscribe(params => {
      if (params['item']) {
        this.item = JSON.parse(params['item']);
      }
    });
  }
}
