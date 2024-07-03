import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserDetails } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { get } from 'http';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [CommonModule],
  providers: [Router],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css',
})
export class NavigationbarComponent {
  userdetails: UserDetails | null = null;
  isSubMenuActive = false;
  user_id: string = '';

  constructor(
    private userService: UsersService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {
    const userId = this.localstorageService.getItem('user_id');
    if (userId) {
      this.getUserDetails(userId);
    } else {
      console.error('User ID is not available in local storage.');
    }
  }
  getUserDetails(userId: string): void {
    this.userService.getUserDetails(userId).subscribe(
      (response: any) => {
        this.userdetails = response.user;
        console.log('User Details:', this.userdetails);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  toggleMenu() {
    this.isSubMenuActive = !this.isSubMenuActive;
  }
  logout() {
    this.localstorageService.removeItem('user_id');
    this.localstorageService.removeItem('token');
    this.router.navigate(['/login']);
  }
}
