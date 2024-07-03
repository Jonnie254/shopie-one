import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponentComponent } from '../user-component.component';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {

}
