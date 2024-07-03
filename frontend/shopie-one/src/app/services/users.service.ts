import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getAllUsers() {
    return this.http.get('http://localhost:5700/users/all-users');
  }
  getUserDetails(user_id: string) {
    return this.http.get(`http://localhost:5700/users/${user_id}`);
  }
}
