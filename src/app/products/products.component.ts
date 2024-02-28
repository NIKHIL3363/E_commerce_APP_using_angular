import { Component,OnInit } from '@angular/core';
import { Productservice } from './productservice';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers:[Productservice]
})
export class ProductsComponent {

constructor(private productservice:Productservice)
{


}
ngOnInit()
{


}

  fun(data:{productname:string,productid:number,imageurl:string,productprice:string,productdescription:string})
  {
    
    console.log('fun called')
    console.log(data.productname)
 this.productservice.gun(data)

  }
}
