import { Component } from '@angular/core';
import { Productservice } from '../products/productservice';
import { product } from '../../datatypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
popolularproducts:undefined|product[];
trendingproducts:undefined|product[];

constructor(private ds:Productservice)
{


}

  ngOnInit()
  {

    console.log('in ngoninit')
    
this.ds.popularproduct().subscribe((data)=>{
  console.log(data)
  this.popolularproducts=data
})

this.ds.trendingProduct().subscribe((data)=>{
this.trendingproducts=data


})
  }
}
