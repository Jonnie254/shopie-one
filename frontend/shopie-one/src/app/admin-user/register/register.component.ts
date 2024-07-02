import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserRegister } from '../../interfaces/users';
import { FormGroup, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authservice: AuthService) {}

  registerSuccess: boolean = false;
  registerError: boolean = false;
  error = '';
  successmessage = '';

  clearMessages() {
    this.registerSuccess = false;
    this.registerError = false;
  }

  signupObj: UserRegister = {
    username: '',
    email: '',
    password: '',
  };

  onRegister() {
    this.authservice.registerUser(this.signupObj).subscribe((res: any) => {
      if (res.message) {
        this.registerSuccess = true;
        this.successmessage = res.message;
        setTimeout(() => {
          this.registerSuccess = false;
          this.successmessage = '';
        }, 2000);
      } else {
        this.registerError = true;
        this.error = res.error as string;
        setTimeout(() => {
          this.error = '';
          this.registerError = false;
        }, 2000);
      }
    });
  }
}
