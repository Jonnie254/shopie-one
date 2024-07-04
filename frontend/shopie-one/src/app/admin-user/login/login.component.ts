import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../../interfaces/users';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginError: boolean = false;
  loginSuccess: boolean = false;
  error: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private localstorageService: LocalstorageService
  ) {}
  signInObj: UserLogin = {
    email: '',
    password: '',
  };
  login() {
    this.authservice.loginUser(this.signInObj).subscribe(
      (res: any) => {
        if (res.token) {
          this.authservice.checkDetails(res.token).subscribe(
            (response: any) => {
              this.localstorageService.setItem('user_id', res.user_id);
              this.localstorageService.setItem('token', res.token);
              this.loginSuccess = true;
              this.successMessage = 'Login successful! Redirecting...';
              setTimeout(() => {
                this.loginSuccess = false;
                this.successMessage = null;
                if (res.role === 'admin') {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['/user']);
                }
              }, 3000);
            },
            (error) => {
              console.error('Error fetching user details:', error);
              this.loginError = true;
              this.errorMessage = 'Failed to fetch user details';
              this.clearMessages();
            }
          );
        } else {
          console.error('Error logging in:', res.error);
          this.loginError = true;
          this.errorMessage = 'Invalid credentials';
          this.clearMessages();
        }
      },
      (error) => {
        console.error('Error logging in:', error);
        this.loginError = true;
        this.errorMessage = 'Failed to authenticate';
        this.clearMessages();
      }
    );
  }
  clearMessages() {
    setTimeout(() => {
      this.loginError = false;
      this.errorMessage = null;
    }, 5000);
  }
}
