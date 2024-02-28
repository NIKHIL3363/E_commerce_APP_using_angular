import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { product,cart,summary, order } from '../../datatypes';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrl: './myorder.component.css'
})
export class MyorderComponent {
ordersdata:order[]
userid:string
@Input() ordercount=new EventEmitter<order[]>()

  constructor(private userservice:UserserviceService)
  {


  }

  ngOnInit(){
      let user=localStorage.getItem('user')
      this.userid=JSON.parse(user).username


    this.userservice.getorderdata(this.userid).subscribe((data)=>{
this.ordersdata=Object.values(data)

  this.ordercount.emit(Object.values(data))
      

    })
  }
cancel(id:number)
{

  this.userservice.deletethisorder(id,this.userid)
}



}
