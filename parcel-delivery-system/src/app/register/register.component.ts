import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

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
      
      this.auth.registerUser(email,phoneNumber, password).subscribe((data: { success: any; message: any; }) => {
        console.log(data)
        if(data.success) {
          alert("log in")
        this.router.navigate(['login'])
        this.auth.setLoggedIn(true)
      } else {
        window.alert(data.message)
      }
      })
    }
}

}
