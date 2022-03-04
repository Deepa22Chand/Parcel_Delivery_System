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
interface parcel_Details{
   success: boolean,
  message: string
}
interface parcelDelivery_details{
  success: boolean,
  message: string,

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  parcelDetails(fullname: any, username: any, email: any, phonenumber: any, country: any, state: any, city: any, zipcode: any, userid: any) {
    throw new Error('Method not implemented.');
  }
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

  registerUser(email: any,phoneNumber:any, password: any) {
    return this.http.post<registerResponse>('/api/register', {
      email,
      password,
      phoneNumber
      
      
      
    })
  }
  
  customerDetails(name:any,username:any,email:any,phonenumber:any,country:any,state:any,city:any,zipcode:any,userid:any){
     return this.http.post<customer_Details>('/api/customer_details' , {
      name,username,email,phonenumber,country,city,state,zipcode,userid
      
    })
  }

  parcel_details(name: any,username: any,country: any,phonenumber: any,phonenumber2: any,state: any,city: any,zipcode: any,userid: any,address: any,num_of_packages: any,weight: any,length_breadth: any, Pickup_date: any,earlest_pickupTime: any,latest_pickupTime: any,pickup_location: any,amount: any){
       return this.http.post<parcel_Details>('/api/parcel_details' , {
      name,username,country,phonenumber,phonenumber2,state,city,zipcode,userid,address,num_of_packages,weight,length_breadth, Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,amount
      
    })
  }

  parcel_delivery(userid: any,name: any,phoneNumber: any,num_of_packages: any,weight: any,Pickup_date: any,earlest_pickupTime: any,latest_pickupTime: any,pickup_location: any,address:any,amount: any){
    return this.http.post<parcelDelivery_details>('/api/parcel_delivery',{
      userid,name,phoneNumber,num_of_packages,weight,Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,address,amount
    })
  }

}
