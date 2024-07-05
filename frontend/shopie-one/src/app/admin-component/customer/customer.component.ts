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
  users: UserDetails[] = [];
  showOverlay: boolean = false;
  selectedUser: UserDetails | null = null;
  isEditMode: boolean = false;
  displayedUsers: UserDetails[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private userservice: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userservice.getAllUsers().subscribe((response: any) => {
      this.users = response.users;
      this.updateDisplayedUsers();
    });
  }

  updateDisplayedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedUsers = this.users.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  totalPages() {
    return Math.ceil(this.users.length / this.itemsPerPage);
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
