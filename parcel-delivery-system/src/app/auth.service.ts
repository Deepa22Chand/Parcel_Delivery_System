import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
interface myData {
  
  success: boolean,
  message: string
}

interface registerResponse {
  success: boolean,
  message: string,
  id:any
}
interface customer_Details{
   success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private EnteredDetails =false
    private loggedInStatus = false
    

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
    
  }
  setEnterDetails(value:boolean){
    this.EnteredDetails = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }
    get enteredDetails() {
    return this.EnteredDetails
  }
  getUserDetails(email: any, password: any) {
    // post these details to API server return user info if correct
    return this.http.post<myData>('/api/login', {
      email,  
      password
    })
  }

  registerUser(email: any, password: any) {
    return this.http.post<registerResponse>('/api/register', {
      email,
      password,
      
      
      
    })
  }
  customerDetails(name:any,username:any,email:any,phonenumber:any,country:any,state:any,city:any,zipcode:any,userid:any){
     return this.http.post<customer_Details>('/api/customer_details' , {
      name,username,email,phonenumber,country,city,state,zipcode,userid
      
    })
  }

}
