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
submit(){
  console.log(this.email,this.name,this.msg);
  this.auth.feedback(this.email,this.name,this.msg).subscribe();
}
  constructor(private user:UserService,private auth:AuthService) {
     this.user.getData().subscribe((data: { status: any; ID: any; email: string;phoneNumber:any;Number:any;Weight:any;date:string;Total_amount:any;Address:any;latest_pickupTime:any;earlest_pickupTime:any;pickup_location:any; }) => {
      
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
    });
   }

  ngOnInit(): void {
  }
   //readmore variable, its true than read more string will print
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = true;
    visible1:boolean = false

  //onclick toggling both
  onclick()
  { this.visible1=false
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible;
    
  }
    onclick2()
  {
    this.visible=false
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible1 = !this.visible1
    
  }


}
