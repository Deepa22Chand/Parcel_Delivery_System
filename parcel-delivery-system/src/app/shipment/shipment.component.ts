import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {
email: string="";
id:any;
phoneNumber:any;
number_of_packages:any;
Weight:any;
pickup_date:any;
Total_amount:any;
Address:any;
latest_pickupTime:any;
earlest_pickupTime:any;
pickup_location:any;
name:string="";
msg:string="";

  constructor(private user:UserService,private auth:AuthService) {
    this.visible1=false
     this.user.getData().subscribe((data: { status: any; ID: any; email: string;phoneNumber:any;Number:any;Weight:any;date:string;Total_amount:any;Address:any;latest_pickupTime:any;earlest_pickupTime:any;pickup_location:any; }) => {
     if(data.Number!=undefined){
      this.visible=true
        this.email = data.email
        this.id=data.ID
        this.number_of_packages=data.Number
        this.phoneNumber=data.phoneNumber,
        this.Weight=data.Weight,
        this.pickup_date=data.date,
        this.Total_amount=data.Total_amount,
        this.Address=data.Address,
        this.latest_pickupTime=data.latest_pickupTime,
        this.earlest_pickupTime=data.earlest_pickupTime,
        this.pickup_location=data.pickup_location
        
       console.log(this.email,this.id,this.phoneNumber,this.Weight,this.pickup_date,this.Total_amount,this.Address,this.latest_pickupTime,this.earlest_pickupTime,this.pickup_location)
    
     } 
     else{
       this.visible2=true
        this.email = data.email
     }
     });

   }

  ngOnInit(): void {
  }
   //readmore variable, its true than read more string will print
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = false;
    visible1:boolean = false
visible3:boolean = false
visible2:boolean=false
  //onclick toggling both
  onclick()

  { 
    // console.log("shipment details");
    this.visible1=false
    this.visible3=false
     this.user.getData().subscribe((data: { Number:any ;})=>{
      if(data.Number!=undefined){
      this.visible=true
    }
    else{
      this.visible2=true
      this.visible3=false
    }
  });
    
  }
    onclick2()
  { 
    // console.log("feedback details");
    this.visible=false
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible1 = true
    
  }
  submit(){
  
  this.visible3 = true
  // console.log(this.email,this.name,this.msg);
  this.auth.feedback(this.email,this.name,this.msg).subscribe();
  this.visible=false
  this.visible1 = false
  this.visible2=false
  
}
orderReceived(){
  console.log("order received")
  this.user.delete().subscribe((data:{success:any;})=>{
    this.visible=false
    this.visible2=true
  });
}

}
