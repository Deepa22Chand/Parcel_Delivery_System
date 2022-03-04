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
    
    
    //    if(email !=''){
    //    var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;//anystring@anystring.anystring
    //    if (!regex.test(email)) {
    //   alert("invalid email");
    //     return ;
    // }
    // }
    // if(fullname!=''){
    //   alert("Please enter your fullname");
    //   return
    // }
    // if(username!=''){
    //   alert("Please enter your username");
    //   return
    // }
    // if(phonenumber!=''){
    //   if(phonenumber.length<10){
    //     alert("Invalid phonenumber !! \nPlease enter your phonenumber");
    //   }
    //   return
    // }
    // if(country!=''){
    //   alert("Please enter your country name");
    //   return
    // }
    // if(state!=''){
    //   alert("Please enter your state name");
    //   return
    // }
    // if(city!=''){
    //   alert("Please enter your city name");
    //   return
    // }
    // if(zipcode!=''){
    //   alert("Please enter your zipcode");
    //   return
    // }
    

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
    
  console.log(fullname,username,email,phonenumber,country,state,city,zipcode,userid);

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
