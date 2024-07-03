import { Component } from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login2',
  standalone: true,
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css',
  imports: [UserNavbarComponent, RouterOutlet],
})
export class Login2Component {}
