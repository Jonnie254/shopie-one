import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private apiUrl = 'http://localhost:5700/users';

  constructor(private http: HttpClient) {}

  resetPassword(email: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${email}`, { password });
  }
}
