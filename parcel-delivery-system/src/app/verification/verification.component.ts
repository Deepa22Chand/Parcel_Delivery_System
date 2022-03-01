import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  isShown: boolean = false ;
  phoneNumber:string="";
  OTP:string= "my OTP";
  ngOnInit(): void {
  
  }
  constructor(private router:Router,private users:UserService){}
  show(){
 this.isShown = ! this.isShown;
  // this.OTP=Math.floor(100000 + Math.random() * 900000);
  // console.log(this.OTP);
  this.users.verification().subscribe((data: { success: any; otp: any; phoneNumber:any}) => {
      
        console.log("successfully Send OTP",data.otp)
        this.OTP=data.otp;
        this.phoneNumber=data.phoneNumber;
        
      
    })
  
 
  }

  verify(event: any){
    const target = event.target.querySelector('#otp').value
   console.log("verify",this.OTP,target);
   if(this.OTP!=target){
        console.log("verify",this.OTP,target);
     window.alert(`Wrong OTP!! \nplease try again`);
   }
   else{
     window.alert("Verification Completed");
     this.router.navigate(['login'])
   }
}
 title = 'FormValidation';  
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
 isValidFormSubmitted = false;  
 user = new User();  
   
   
 onFormSubmit(form: NgForm) {  
   this.isValidFormSubmitted = false;  
   if (form.invalid) {  
      return;  
   }  
   this.isValidFormSubmitted = true;  
   form.resetForm();  
} 

}
export class User {  
 mobileNumber ?: string;  
}
