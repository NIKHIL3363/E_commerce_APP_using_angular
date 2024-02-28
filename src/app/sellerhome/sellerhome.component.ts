import { Component,OnInit } from '@angular/core';
import { Users } from '../services/users.service';
import { Productservice } from '../products/productservice';
import { product } from '../../datatypes';
import { HttpClient} from '@angular/common/http';
import {  faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sellerhome',
  templateUrl: './sellerhome.component.html',
  styleUrl: './sellerhome.component.css',

  providers:[Users]
})
export class SellerhomeComponent {
productlist:product[]
icon=faTrash
icon2=faEdit
  constructor(private productservice:Productservice,private http:HttpClient) 
  {
    
  }

  ngOnInit()
  {
    console.log('ngoninit called ')
this.productservice.productlist().subscribe((data)=>{

console.log(data)
this.productlist=data

console.log(this.productlist)

})





  }
  deleteproduct(id:string)
  {
console.log(id)


this.productservice.deleteproduct(id)
  }
}
