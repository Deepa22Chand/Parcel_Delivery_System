import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.scss']
})
export class ParcelDetailsComponent implements OnInit {
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
 earlest_pickupTime!:string;

 latest_pickupTime:string="";
 pickup_location:string="";

  
  constructor(private router:Router ) { }
 
  ngOnInit(): void {
     
  }

    PostData(){
      var data=[];
      data[0]=this.name;
      data[1]=this.username;
      data[2]=this.country;
      data[3]=this.phonenumber;
      data[4]=this.phonenumber2;
      data[5]=this.state;
      data[6]=this.city;
      data[7]=this.address;
      data[8]=this.zipcode;
      data[9]=this.num_of_packages;
      data[10]=this.weight;
      data[11]=this.length_breadth;
      data[12]=this.Pickup_date;
      data[13]=this.earlest_pickupTime;
      data[14]=this.latest_pickupTime;
      data[15]=this.pickup_location;
      localStorage.setItem("data", JSON.stringify(data));
    //   localStorage.setItem("name",JSON.stringify(this.name));
    //   localStorage.setItem("username",JSON.stringify(this.username));
    //   localStorage.setItem("country",JSON.stringify(this.country));
    //   localStorage.setItem("phonenumber",JSON.stringify(this.phonenumber));
    //   localStorage.setItem("phonenumbe2",JSON.stringify(this.phonenumber2));
    //   localStorage.setItem("city",JSON.stringify(this.city));
    //   localStorage.setItem("address",JSON.stringify(this.address));
    //   localStorage.setItem("state",JSON.stringify(this.state));
    //   localStorage.setItem("zipcode",JSON.stringify(this.zipcode));
    //   localStorage.setItem("num_of_packages",JSON.stringify(this.num_of_packages));
    //   localStorage.setItem("weight",JSON.stringify(this.weight));
    //   localStorage.setItem(" length_breadth",JSON.stringify(this. length_breadth));
    //   localStorage.setItem("Pickup_date",JSON.stringify(this.Pickup_date));
    //  localStorage.setItem(" earlest_pickupTime",JSON.stringify(this. earlest_pickupTime));
    //   localStorage.setItem(" latest_pickupTime",JSON.stringify(this. latest_pickupTime));
    
    //   localStorage.setItem("pickup_location",JSON.stringify(this.pickup_location));
      this.router.navigate(['checkout']);
      console.log(this.earlest_pickupTime)
    }
}
