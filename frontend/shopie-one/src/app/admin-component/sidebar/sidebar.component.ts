import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [RouterOutlet, RouterLink, HomeComponent],
})
export class SidebarComponent {
  isActive: boolean = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
