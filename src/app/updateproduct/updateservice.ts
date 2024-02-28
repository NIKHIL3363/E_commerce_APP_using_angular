import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { product } from "../../datatypes";
import { ActivatedRoute, Route, Router } from "@angular/router";


@Injectable({ 
    providedIn:'root'
  }
  )

export class update
  {
  pro:undefined|{productname:string,prouductid:number,imageurl:string,productprice:string,productdescription:string,id:string}[]=[];


constructor(private http:HttpClient,private ro:Router)
{

}

getproduct(productid:string)
{ const product:{productname:string,prouductid:number,imageurl:string,productprice:string,productdescription:string,id:string}[]=[]
console.log('inside getproduct')


   this.http.get('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json').pipe(map((res)=>
{
  console.log(res)
for(const key in res)
{
  console.log(key)
if(key===productid)
{

    console.log('inside if')
    product.push({...res[key],id:key})
    
    
}


}

}))
return 
    

}

updateproduct(productid:string,value:{productname:string,prouductid:number,imageurl:string,productprice:string,productdescription:string,id:string
    
})
{
console.log('call to update product')
this.http.put('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts/'+productid+'.json',value).subscribe((result)=>{


})
this.ro.navigate(['sellerhome'])
}


  }