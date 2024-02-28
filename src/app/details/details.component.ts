import { Component ,OnInit} from '@angular/core';
import { Productservice } from '../products/productservice';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { product,cart } from '../../datatypes';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  searchproductarray:product
 key:string=''
productquantity:number=0
 productid:number
 removecart:boolean
 useridforremove:string=''
constructor(private productservice:Productservice,private ac:ActivatedRoute,private userservice:UserserviceService)
{}

ngOnInit()
  {
 this.key=this.ac.snapshot.paramMap.get('key')
 this.productid=Number.parseInt(this.ac.snapshot.paramMap.get('productid'))
 console.log(this.productid)
 this.productservice.getSearchedProduct(this.key).subscribe((data)=>{
console.log("this is data")
console.log(data)




this.searchproductarray=data





let cartdata=localStorage.getItem('localcart')
if(cartdata&&this.searchproductarray.prouductid)
{

  let items=JSON.parse(cartdata)
  console.log('this are items from cart')
  console.log(items)

  

  let items1=items.filter((item:product)=>{return this.productid===item.prouductid



  })
       
if(items1.length)
{
this.removecart=true
}
else
{
  this.removecart=false
}
}
let user=localStorage.getItem('user')
if(user)
{
  console.log('step 1')

  let userid:string=JSON.parse(user).username
  this.useridforremove=userid
  console.log('going to step 2')
 
this.userservice.getcartitems1(userid).subscribe((result)=>{

  let usercartitems:any[]=Object.values(result)
   let item= usercartitems.filter((item:product)=>{return this.productid===item.prouductid})
   if(item.length)
   {
     this.removecart=true
   }

})
 

  
}
 })

  }


  handle(value:string)
  {

    if( this.productquantity>1&&value==='minus')
    {


      this.productquantity=this.productquantity-1
    }
if(this.productquantity<20&&value==='plus'){


  this.productquantity=this.productquantity+1
}


  }
  addtocart()
  {    


    

   this.searchproductarray.productquantity=this.productquantity




    if(!localStorage.getItem('user'))
    {

      this.userservice.localaddtocart(this.searchproductarray)
      this.removecart=true
    }
    else
    {

      let userid:string=JSON.parse(localStorage.getItem('user')).username
      this.useridforremove=userid

      

        let cartdata1:cart={

          ...this.searchproductarray,
          userid,

        }

          
          this.userservice.addtocartuser(cartdata1).subscribe((data)=>{



        
    
          })    

      
      
      this.removecart=true




    
      setTimeout(() => {
        this.userservice.getcartitems(userid)
        
  
      }, 1000);
  
  




    }
    



  }

  removetocart(productid:number)
  {
    console.log(productid)
this.userservice.removetocart(productid,this.useridforremove)
    


  }
}
