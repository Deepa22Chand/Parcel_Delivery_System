import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



interface EnteredDetails {
  status: boolean
}
interface isLoggedIn {
  status: boolean
}
interface logoutStatus {
  success: boolean
}
interface myData {
  email: string,
  status: boolean,
  ID:any
  
  
}
interface verify{
  success: boolean,
  otp:Number,
  phoneNumber:any
}

@Injectable({providedIn: 'root'})
export class UserService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<myData>('/api/data')
  }
  verification() {
    return this.http.get<verify>('/api/verification') }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin')
  }
  enteredDetails(): Observable<isLoggedIn> {
    return this.http.get<EnteredDetails>('/api/enteredDetails')
  }
  logout() {
    return this.http.get<logoutStatus>('/api/logout')
  }

}
