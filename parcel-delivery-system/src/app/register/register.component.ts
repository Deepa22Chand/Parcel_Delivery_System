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
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    const cpassword = target.querySelector('#cpassword').value

    if(password != cpassword) {
      alert("Passwords do not match");
      errors.push("Passwords do not match")
      
    }

    // more validation

    if(errors.length === 0) {
      this.auth.registerUser(username, password).subscribe((data: { success: any; message: any; }) => {
        console.log(data)
        if(data.success) {
          alert("log in")
        this.router.navigate(['dashboard'])
        this.auth.setLoggedIn(true)
      } else {
        window.alert(data.message)
      }
      })
    }
    // console.log(username, password)
  }


}
