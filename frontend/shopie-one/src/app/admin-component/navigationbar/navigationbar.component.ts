import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css',
})
export class NavigationbarComponent {
  isSubMenuActive = false;

  toggleMenu() {
    this.isSubMenuActive = !this.isSubMenuActive;
  }
}
