import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponentComponent } from '../user-component.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet, UserComponentComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
