import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/local-storage-servic.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsersService } from '../../services/users.service';
import { UserDetails } from '../../interfaces/users';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent implements OnInit, OnDestroy {
  itemCount: number = 0;
  private subscription: Subscription = new Subscription();
  userdetails: UserDetails | null = null;
  isSubMenuActive = false;
  user_id: string = '';

  constructor(
    private cartService: CartService,
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

  ngOnInit(): void {
    this.subscription = this.cartService.itemCount$.subscribe((count) => {
      this.itemCount = count;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
