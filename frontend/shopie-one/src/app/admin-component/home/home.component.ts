import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from '../navigationbar/navigationbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterOutlet, NavigationbarComponent],
})
export class HomeComponent {}
