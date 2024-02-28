import { Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { cart,product } from '../../datatypes';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrl: './user-authentication.component.css'
})
export class UserAuthenticationComponent {
  login:boolean=false
  signup:boolean=true
  invalid:boolean=false
constructor(private us:UserserviceService){

}

ngOnInit()
{
  
}

usersignup(value:{username:string,email:string,password:string})
{

  console.log(value)


this.us.postuser(value)
}
userlogin(value:{username:string,password:string})
{
  console.log('login data')
  console.log(value)
  this.us.userlogin(value)



  if(this.us.invalid)
  {

    this.invalid=true
  }
  else
  {

     setTimeout(() => {
      this.addtocartuser()

     },5000);
     
     

  }
}
show(){

  this.login=true
this.signup=false

}


addtocartuser()
{
  console.log("=====")

 let items= JSON.parse(localStorage.getItem('localcart'))
 console.log('this are items form local cart')
 console.log(items)

let user=JSON.parse(localStorage.getItem('user'))
console.log('this is user')
console.log(user)
let userid=user.username

    console.log('this is username')
    console.log(userid)
    items.forEach((item:product,index)=> {
      
       
      let cartdata:cart={
        ...item,
        userid

      
      }
      if(items)
      {

      setTimeout(()=>{
        this.us.addtocartuser(cartdata).subscribe((result)=>{

          if(result)
          {

            alert('localstorage data store in db')
          }
        })


      },500)
    }

  

    });



    setTimeout(() => {
      this.us.getcartitems(userid)
      

    }, 1000);
    


  
}

}
