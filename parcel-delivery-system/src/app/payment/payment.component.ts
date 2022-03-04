import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

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
  customer_id=""
  constructor(private router:Router,private auth:AuthService,private user:UserService) { }

  ngOnInit(): void {
    this.user.getData().subscribe((data: { status: any; ID: any; email: string; }) => {
      if(data.status) {
        this.customer_id=data.ID
        
      } 
      // else {
      //   this.router.navigate(['dashboard'])
      // }
    })

}

 submit(event: { preventDefault: () => void; target: any; }){
   console.log("payment processing")
   event.preventDefault()
  const target = event.target
  const userid = target.querySelector('#userid').value
  console.log(userid)
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
      var storeData= JSON.parse(localStorage.getItem('parcel')||'{}');
      var amount= JSON.parse(localStorage.getItem("amount")||'{}')

  
     console.log(userid,storeData[0],storeData[3],storeData[9],storeData[10],storeData[12],storeData[13],storeData[14],storeData[15] ,storeData[7],amount)
      this.auth.parcel_delivery(userid,storeData[0],storeData[3],storeData[9],storeData[10],storeData[12],storeData[13],storeData[14],storeData[15] ,storeData[7],amount).subscribe((data: { success: any; message: any; }) => {
      // console.log("updating parcel details3")
      
        this.router.navigate(['shipment'])
        
    })
   
 }
  }

