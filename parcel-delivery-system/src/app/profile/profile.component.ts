import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  customer_id=""

 constructor(private auth: AuthService, private router: Router,private user: UserService) { }

  ngOnInit() {  
    this.user.getData().subscribe((data: { status: any; ID: any; email: string; }) => {
      if(data.status) {
        this.customer_id=data.ID
        
      } 
      // else {
      //   this.router.navigate(['dashboard'])
      // }
    })  
    

  }


  customerDetails(event: { preventDefault: () => void; target: any; }){
    
    event.preventDefault()
    const target = event.target

    const fullname = target.querySelector('#fullname').value
    const email = target.querySelector('#email').value
    const username = target.querySelector('#username').value
    const phonenumber = target.querySelector('#phonenumber').value
    const country = target.querySelector('#country').value
    const state = target.querySelector('#state').value
    const city = target.querySelector('#city').value
    const zipcode = target.querySelector('#zipcode').value
    const userid = target.querySelector('#userid').value
    
  
    
    this.auth.customerDetails(fullname,username,email,phonenumber,country,state,city,zipcode,userid).subscribe((data: { success: any; message: any; }) => {
      if(data.success) {
        this.router.navigate(['dashboard'])
        this.auth.setEnterDetails(true)
      } else {
        window.alert(data.message)
      }
    })
  }

 

  


}
