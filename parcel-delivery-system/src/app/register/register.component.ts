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
  

    // more validation

    return this.register(errors,email,password);
    // console.log(username, password)
  }
private register(errors: string | any[],email: undefined,password: undefined){
  if(errors.length === 0) {
      
      this.auth.registerUser(email, password).subscribe((data: { success: any; message: any; }) => {
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
