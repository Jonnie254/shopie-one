import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [RouterOutlet, RouterLink, HomeComponent, CommonModule],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
  ) {}
  isActive: boolean = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  logout() {
    this.localstorageService.removeItem('user_id');
    this.localstorageService.removeItem('token');
    this.router.navigate(['/login']);
  }
}
