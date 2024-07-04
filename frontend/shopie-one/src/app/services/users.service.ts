import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get('http://localhost:5700/users/fetch-all-users');
  }

  getUserDetails(user_id: string) {
    return this.http.get(`http://localhost:5700/users/${user_id}`);
  }

  updateUser(user: UserDetails) {
    return this.http.put(`http://localhost:5700/users/updateUser/${user.user_id}`, user);
  }

  deleteUser(user_id: string) {
    return this.http.delete(`http://localhost:5700/users/delete/${user_id}`);
  }
}
