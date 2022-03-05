import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isShown: boolean = false ;
  customer_id=""
  showTotal:boolean=false
 name:string = "";
 username:string="";
 country:string="";
 phonenumber:string="";
 phonenumber2:string="";
 city:string=""; 
 address:string="";
 state:string="";
 zipcode!: Number;
 num_of_packages!:number;
 weight!:Number;
 length_breadth!:Number;
 Pickup_date:string="";
 earlest_pickupTime:string=""

 latest_pickupTime:string="";
 pickup_location:string="";
  amount!: Number;
  totalamount!:any;
  total5: any;
total10: any;
recalculate:any;
coupen()
{
  this.isShown = ! this.isShown;
}
 coupen10(){
   this.total10=this.totalamount;
   
    this.total10=this.total10 * 0.1;
    this.recalculate= (this.totalamount -this.total10);
  return this.amount=this.total10
}
 coupen5(){
     this.total5=this.totalamount;
    this.total5=this.total5 * 0.05;
    this.recalculate= (this.totalamount -this.total5);
return this.amount=this.total5
}

 constructor(private router:Router,private auth: AuthService,private user:UserService) {
    
   }

  ngOnInit(): void {
    



  
    this.user.getData().subscribe((data: { status: any; ID: any; email: string; }) => {
      if(data.status) {
        this.customer_id=data.ID
        
      } 
      // else {
      //   this.router.navigate(['dashboard'])
      // }
    })
var storeData= JSON.parse(localStorage.getItem('data')||'{}')
    this.name= storeData[0];
    this.username=storeData[1];
    this.country=storeData[2];
    this.phonenumber=storeData[3];
    this.phonenumber2=storeData[4];
    this.state=storeData[5];
    this.city=storeData[6];
    this.address=storeData[7];
    this.zipcode=storeData[8];
    this.num_of_packages=storeData[9];
    this.weight=storeData[10];
    this.length_breadth=storeData[11];
    this.Pickup_date=storeData[12];
    this.earlest_pickupTime=storeData[13];
    this.latest_pickupTime=storeData[14];
    this.pickup_location=storeData[15]
      this.total10=this.num_of_packages*100;
  this.amount=0;
  this.total5=this.num_of_packages*100;
 
this.totalamount=this.num_of_packages*100;
this.recalculate=this.num_of_packages*100;
localStorage.setItem("parcel", JSON.stringify(storeData));

     
   

}

 parcel_details(event: { preventDefault: () => void; target: any; }){
   
    console.log("updating parcel details1")
    event.preventDefault()

    const target = event.target


    const userid = target.querySelector('#userid').value
  //   console.log(userid)

    console.log(this.name,this.username,this.country,this.phonenumber,this.phonenumber2,this.state,this.city,this.zipcode,this.address,this.num_of_packages,this.weight,this.length_breadth, this.Pickup_date,this.earlest_pickupTime,this.latest_pickupTime,this.pickup_location,this.recalculate);
    this.auth.parcel_details(this.name,this.username,this.country,this.phonenumber,this.phonenumber2,this.state,this.city,this.zipcode,userid,this.address,this.num_of_packages,this.weight,this.length_breadth, this.Pickup_date,this.earlest_pickupTime,this.latest_pickupTime,this.pickup_location,this.recalculate) .subscribe((data: { success: any; message: any; }) => {
      localStorage.setItem("amount",JSON.stringify(this.recalculate));
      console.log("updating parcel details3",this.name,this.username,this.country,this.phonenumber,this.phonenumber2,this.state,this.city,this.zipcode,userid,this.address,this.num_of_packages,this.weight,this.length_breadth, this.Pickup_date,this.earlest_pickupTime,this.latest_pickupTime,this.pickup_location,this.recalculate)
      if(data.success) {
        this.router.navigate(['payment'])
        this.auth.setEnterDetails(true)
      } else {
        window.alert(data.message)
      }
    })
}}