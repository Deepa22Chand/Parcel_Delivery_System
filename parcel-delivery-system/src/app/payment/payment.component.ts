import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cname:string="";
  ccnum:string="";
  expmonth:string="";
  expyear:string="";
  cvv:string="";

  constructor(private router:Router) { }

  ngOnInit(): void {


}
 submit(){
    if(this.cname==""){
      alert('Please enter card holder name.'); 
      return ;}
      if(this.ccnum==""){
      alert('Please enter Credit card number.'); 
      return ;}
      if(this.expmonth==""){
      alert('Please enter Exp Month.'); 
      return ;}
      if(this.expyear==""){
      alert('Please enter Exp Year.'); 
      return ;}
      if(this.cvv==""){
      alert('Please enter card cvv.'); 
      return ;}
      this.router.navigate(['dashboard']);
 }
  }

