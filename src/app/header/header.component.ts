import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productservice } from '../products/productservice';
import { LiteralMap } from '@angular/compiler';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
constructor(private router:Router,private prouductservice:Productservice,private user:UserserviceService){}
sellerarea:string='default'
sellername:string=''
userarea:string='default1'
property:string='nikhil'
 a:string=''
 username:string=''
 nikhil:boolean=true
cartitems:number=0
usercartitems:number=0
myordernumber:number=0

ngOnInit(){



  this.router.events.subscribe((value:any)=>{
console.log(value)
if(value.url){

if(localStorage.getItem('seller')&&value.url.includes('seller'))
{


this.sellerarea='nikss'
let sellerdata=localStorage.getItem('seller')
let sellerdatainlocal=JSON.parse(sellerdata)

this.sellername=sellerdatainlocal.username
}
else if(localStorage.getItem('user')){


  let userstore=localStorage.getItem('user')
  let userdata=JSON.parse(userstore)
this.username=userdata.username
this.property='komal'

this.user.getcartitems(this.username)
this.user.usercartdata.subscribe((data)=>{
  this.usercartitems=data.length
})


}

else
{
   this.sellerarea='default'
  console.log('outside area')
this.nikhil=true}

}


  })
  let cartdata=localStorage.getItem('localcart')
if(cartdata)
{
  this.cartitems=JSON.parse(cartdata).length
}
this.user.cartdata.subscribe((data)=>
{
  this.cartitems=data.length
  
})
  
}
logout()
{
console.log('in logout')
  localStorage.removeItem('seller')
this.router.navigateByUrl('home')


}
logoutuser()
{
localStorage.removeItem('user')

this.router.navigateByUrl('')

}

sugestion(eve:KeyboardEvent){


 const element=eve.target as HTMLInputElement
 let query=element.value


 console.log(query)
    this.prouductservice.suggestions(query).subscribe((data)=>{
      console.log(data)
    },
  
    
    
    
    
    )

}
searchproduct1(name:string)
{
let prd5=[]
console.log('call to searchproduct1')


this.router.navigate([`search/${name}`])











}

}
