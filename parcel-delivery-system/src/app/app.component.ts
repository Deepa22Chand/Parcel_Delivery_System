import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   records = []
  title = 'parcel-delivery-system';

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getDataFromAPI();
  }
  constructor (private service: AuthService){}
  getDataFromAPI(){
    this.service.getUserDetails(email,password).subscribe((response)=>{
        // console.log('Response from API is', response);
        console.log("API is working");
    }),(error: any)=>{
      console.log('error is',error);
    }
  }
 
  
}
function email(email: any, password: any) {
  throw new Error('Function not implemented.');
}

function password(email: any, password: any) {
  throw new Error('Function not implemented.');
}

