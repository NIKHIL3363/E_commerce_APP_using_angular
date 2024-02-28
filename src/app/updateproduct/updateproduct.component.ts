import { Component, ViewChild } from '@angular/core';
import { product } from "../../datatypes";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { update } from './updateservice';
import { Productservice } from '../products/productservice';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.css',
  providers:[update]
})

export class UpdateproductComponent {
  
   pr:{productname:string,prouductid:number,imageurl:string,productprice:string,productdescription:string,id:string}[]=[];

 @ViewChild('form') form:NgForm
constructor(private http:HttpClient,private ac:ActivatedRoute,private updateservice:update,private prodls:Productservice)
{

  
}


  fun(value:{productname:string,prouductid:number,imageurl:string,productprice:string,productdescription:string,id:string})
{
  console.log(value)
      console.log('call to fun of updateproduct')
      

      let productid=this.ac.snapshot.paramMap.get('id')


      console.log('this is value'+productid)
    this.updateservice.updateproduct(productid,value)


      
    //this.http.get<product>('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json').pipe(map((res)=>{

//console.log('above for')

//let product:product[]=[]


//for(const key in res){

 //console.log('in for ')
//if(key===productid)
//{


  //console.log('in if of updateproductcomponent')
  //product.push({...res[key],id:key})



  //this.http.put('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts/'+productid+'.json',product)

}



}



//}))


//}
//}
