import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, NgForm } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit  {
  successMessage: string | null = null;

  constructor(private ForgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value;
      this.ForgotPasswordService.resetPassword(email, password).subscribe(
        response => {
           this.successMessage = 'Password reset successfully.';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error => {
          this.successMessage = 'Error resetting password.';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        }
      );
    }
  }
}
