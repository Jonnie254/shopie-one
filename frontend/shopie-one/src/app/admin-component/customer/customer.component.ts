import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserDetails } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  showProductForm: boolean = false;
  user: UserDetails[] =[];
  showOverlay: boolean = false;
  selectedUser: UserDetails | null = null;
  isEditMode: boolean = false; 
  constructor(private userservice: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userservice.getAllUsers().subscribe((response: any) => {
      this.user = response.users;
    });
  }

  toggleProductForm(user?: UserDetails) {
    this.isEditMode = !!user;
    this.selectedUser = user || null;
    this.showProductForm = !this.showProductForm;
    this.showOverlay = !this.showOverlay;
  }

  updateUser() {
    if (this.selectedUser) {
      this.userservice.updateUser(this.selectedUser).subscribe(() => {
        this.getUsers();
        this.toggleProductForm();
      });
    }
  }

  deleteUser(userId: string) {
    this.userservice.deleteUser(userId).subscribe(() => {
      this.getUsers();
    });
  }
}
