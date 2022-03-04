import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
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

 //hiding info box
visible:boolean = false;
visible1:boolean = false

  constructor(private user:UserService) { }

  ngOnInit(): void {
        
     this.user.orderHistory().subscribe((data: { status: any; ID: any; email: string;phoneNumber:any;Number:any;Weight:any;date:string;Total_amount:any;Address:any;latest_pickupTime:any;earlest_pickupTime:any;pickup_location:any; }) => {
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
    
     } else{
       this.visible1=true
     }
   
     });
  }

}
