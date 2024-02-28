import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, map } from "rxjs";
import { SellerComponent } from "../seller/seller.component";

@Injectable({
  providedIn:'root'
}
)
export class Users
{


  iserror=new EventEmitter<boolean>(false)
   issignedup=new BehaviorSubject<boolean>(false)
  //issignedup:boolean=false;


  //  users:Student[]=[]


constructor(private http:HttpClient,private act:ActivatedRoute,private router:Router)
{


}



createuser(data:{username:string,password:string,emailid:string})
{

  console.log("in service method")
     this.http.post('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/products.json',data,{observe:'response'}).subscribe((result)=>
     {

     this.issignedup.next(true)
     
 
     //localStorage.setItem('seller',JSON.stringify(data))


  
     console.log("should be navigated")


      this.router.navigate(['sellerhome']);

      
    }
    
    )

     

   // this.router.navigateByUrl("/sellerhome")
}

/*reloadseller()
{
if(localStorage.getItem('seller'))
{

  this.issignedup.next(true)
}

}*/


loginseller(data:{username:string,password:string})
{
console.log('loginsellerfunction')

this.http.get('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/products.json?username-${data.username}password-${data.password}').pipe(map((res)=>{
const products=[];



for(const key in res)
{
if(res.hasOwnProperty(key))
{
products.push({...res[key],id:key})

}
}

return products

})).subscribe((users)=>{

  console.log(users)

if(users.find(user=>user.username==data.username && user.password==data.password))
{

  console.log("log in succes");
  this.issignedup.next(true)
  localStorage.setItem('seller',JSON.stringify(data))
  this.router.navigate(['sellerhome'])
}
else
{

   console.log('invalid')
  this.iserror.emit(true);
  

}

  

  
}
  )
//const fetcheddata=JSON.stringify(result)
//console.log(fetcheddata)

}
}