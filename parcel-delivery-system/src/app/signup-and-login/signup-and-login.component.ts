import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-and-login',
  templateUrl: './signup-and-login.component.html',
  styleUrls: ['./signup-and-login.component.scss']
})
export class SignupAndLoginComponent implements OnInit {
 //readmore variable, its true than read more string will print
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = true;
    visible1:boolean = false
   visible2:boolean = false
  //onclick toggling both
  onclick()
  { this.visible1=false
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = true;
    this.visible2=false;
    
  }
    onclick2()
  {
    this.visible=false
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible1 = true;
    this.visible2=false;
    
  }
  login(){
    this.visible=true;
    this.visible1=false;
    this.visible2=false;
  }
  signup(){
    this.visible1=true;
    this.visible=false;
    this.visible2=false;
  }
  constructor(private router:Router,private Auth:AuthService) { }

  ngOnInit(): void {
  }
loginUser(event:any) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.Auth.getUserDetails(username, password).subscribe((data: { success: any; message: any; }) => {
      if(data.success) {
        this.router.navigate(['verify'])
        this.Auth.setLoggedIn(true)
      }
      //  else {
      //   window.alert(data.message)
      // }
    })
    // console.log(username, password);
  }
  //-----------------
    registerUser(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault()
    const errors = []
    const target = event.target
    const email = target.querySelector('#email').value
    const phoneNumber = target.querySelector('#phoneNumber').value
    const password = target.querySelector('#password').value
    const cpassword = target.querySelector('#cpassword').value

    if(password.trim().length<=6) {
      alert("Passwords length should be greater than 6");
      errors.push("Passwords length should be greater than 6")
      return
    }
    if(password != cpassword ) {
      alert("Passwords do not match");
      errors.push("Passwords do not match")
      
    }
    if(email !=''){
       var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;//anystring@anystring.anystring
       if (!regex.test(email)) {
      alert("invalid email");
      errors.push("invalid email")
        return ;

    }
    }
    if(phoneNumber!='' && phoneNumber.length<10){
        alert(" Invalid phonenumber \n(Minimum phone number length should be 10)")
        errors.push(" Invalid phonenumber \n(Minimum phone number length should be 10)")
        return
      }
    
  

    // more validation

    return this.register(errors,email,phoneNumber,password);
    // console.log(username, password)
  }
private register(errors: string | any[],email: undefined,phoneNumber: undefined,password: undefined){
  if(errors.length === 0) {
      
      this.Auth.registerUser(email,phoneNumber, password).subscribe((data: { success: any; message: any; }) => {
        console.log(data)
        if(data.success) {
          alert("log in")
          this.visible2=true
          this.visible1=false;
        this.Auth.setLoggedIn(true)
      } else {
        window.alert(data.message)
      }
      })
    }
}
}
