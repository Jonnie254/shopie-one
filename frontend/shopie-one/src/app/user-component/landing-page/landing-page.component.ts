import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponentComponent } from '../user-component.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet, UserComponentComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
