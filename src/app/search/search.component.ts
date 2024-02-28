import { Component,OnInit } from '@angular/core';
import { Productservice } from '../products/productservice';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
searchproduct:string=''
searchproductarray=[]
constructor(private  productservice:Productservice,private router:Router,private ac:ActivatedRoute)
{


}


ngOnInit()
{
      this.searchproduct=this.ac.snapshot.paramMap.get('name')
  console.log('in search component'+this.searchproduct)

this.productservice.getSearchedProducts1(this.searchproduct).subscribe((data)=>{
console.log('this is data below')
  console.log(data)
//console.log(data)

this.searchproductarray.push(data)
console.log(this.searchproductarray)


})
}

}
