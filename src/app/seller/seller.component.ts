import { Component } from '@angular/core';
import { Users } from '../services/users.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
  providers:[Users]
})
export class SellerComponent {
formshow:boolean=true
str1:string=''
  //username:string=''
  //password:string=''
//email:string=''

constructor(private seller:Users)
{



}

//ngOnInit()
//{
  //this.seller.reloadseller()
//}
signup(data:{username:string,password:string,emailid:string})
{
  console.log("in signup merthod 1")

this.seller.createuser(data)
}
login(data:{username:string,password:string})
{

this.seller.loginseller(data)



  this.seller.iserror.subscribe((is)=>{

if(is)
{

  this.str1='invalid credentials'
}

  })
}


changeformshow()
{

  this.formshow=false
}


}
