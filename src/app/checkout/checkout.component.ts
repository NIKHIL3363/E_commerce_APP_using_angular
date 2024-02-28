import { Component,OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { product,cart,summary, order } from '../../datatypes';
import { or } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartitems:cart[]
  pricesummary:summary={price:0,discount:0,tax:0,delivery:0,total:0}
totalprice:number
ordermsg:string
constructor(private userservice:UserserviceService,private router:Router)
{


}

ngOnInit(){
  if(localStorage.getItem('user'))
     {
      
            this.userservice.usercartdata.subscribe((data)=>{

              let price=0;

              this.cartitems=data
              console.log(this.cartitems)


               data.forEach((item)=>{
                                 let  price1=Number.parseInt(item.productprice)
                price=price+(price1*item.productquantity)
                this.pricesummary.price=price
                this.pricesummary.discount=price/10
                this.pricesummary.tax=price/5
                this.pricesummary.total=Math.floor(this.pricesummary.price+this.pricesummary.discount+this.pricesummary.tax)
               
              this.totalprice=this.pricesummary.total
              
              })
              

            })


}
}

order(value:{email:string,address:string,contact:string})
{

console.log(value)
let user=localStorage.getItem('user')
let id:number=0
id= Number.parseInt( uuidv4())

let userid=JSON.parse(user).username

let orderdata:order={

  ...value,
  totalprice:this.totalprice,
  userid,
  id:id


}

console.log('step1')
setTimeout(()=>{
  this.userservice.deletecartitemsoncheckout(userid)
   
},600)

this.userservice.orders(orderdata).subscribe((result)=>{

if(result)
{

  this.ordermsg='order placed succesfully'
  setTimeout(()=>{
    this.router.navigate(['myorder'])

  },6000)
}
})



}




}
