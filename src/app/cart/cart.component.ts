import { Component ,OnInit} from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { product,cart,summary } from '../../datatypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
cartitems:cart[]
userid:string
noitemsincart:boolean=false
pricesummary:summary={price:0,discount:0,tax:0,delivery:0,total:0}
constructor(private userservice:UserserviceService,private router:Router) {
}

  ngOnInit()
{
  
  
  
  
  if(localStorage.getItem('user'))
     {
                let user=localStorage.getItem('user')
                this.userid=JSON.parse(user)
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
               })
              

               if(!this.cartitems.length)
               {
                this.router.navigate(['home'])
               }

            })


     }
else
{

console.log('working for localcart')


}

  }


  checkout()
  {
this.router.navigate(['checkout'])


  }
  
  
  removefromcart(productid:number)
  {


    this.userservice.removetocart(productid,this.userid)

  }
  



}
