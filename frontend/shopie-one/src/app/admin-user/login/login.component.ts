import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../../interfaces/users';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
  constructor(private authservice: AuthService, private router: Router) {}
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
              console.log(response.info?.id);
              localStorage.setItem('token', res.token);
              setTimeout(() => {
                this.loginSuccess = false;
                if (res.info?.role === 'admin') {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['/admin']);
                }
              });
            },
            (error) => {
              console.error('Error fetching user details:', error);
              this.loginError = true;
              this.error = 'Failed to fetch user details';
            }
          );
        } else {
          console.error('Error logging in:', res.error);
          this.loginError = true;
          this.error = 'Invalid credentials';
        }
      },
      (error) => {
        console.error('Error logging in:', error);
        this.loginError = true;
        this.error = 'Failed to authenticate';
      }
    );
  }
}
