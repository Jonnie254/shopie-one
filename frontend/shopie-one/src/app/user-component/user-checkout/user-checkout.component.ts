import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";

@Component({
    selector: 'app-user-checkout',
    standalone: true,
    templateUrl: './user-checkout.component.html',
    styleUrl: './user-checkout.component.css',
    imports: [RouterOutlet, UserNavbarComponent]
})
export class UserCheckoutComponent {

}
