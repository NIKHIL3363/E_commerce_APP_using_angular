import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject ,map} from 'rxjs';
import { product,cart, order } from '../datatypes';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  iserror=new EventEmitter<boolean>(false)
  issignedup=new BehaviorSubject<boolean>(false)
  invalid:boolean=false
  cartdata=new EventEmitter<product[]|[]>()
   i:number=0;
  usercartdata=new EventEmitter<cart[]>()
usercart:[]

  constructor(private http :HttpClient,private router:Router) { }


  postuser(data:{username:string,email:string,password:string})
  {
    console.log('in userservice')
this.http.post('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/users.json',data).subscribe((result)=>{
{
   console.log('this is user data')
  localStorage.setItem('user',JSON.stringify(data))
 this.router.navigate([''])
 
}
  
  
})

  }
  userlogin(value:{username:string,password:string})
  {



  
    
    //return this.http.get('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/users.json?username-${data.username}password-${data.password}').pipe(map((res)=>{
      return this.http.get('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/users.json').pipe(map((res)=>{


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
      
      if(users.find(user=>user.username==value.username && user.password==value.password))
      {
      
            

        console.log("log in succes");
        this.issignedup.next(true)
        localStorage.setItem('user',JSON.stringify(value))
        this.router.navigate([''])
      
         
      }
      else
      {

      
         console.log('invalid')
        
        this.invalid=true
    
      }
      
        
      
        
      }
        )

  


     console.log('inside loign service')
     
      //const fetcheddata=JSON.stringify(result)
      //console.log(fetcheddata)
  }
  localaddtocart(data:product)
  {
    let executed:boolean=true

    console.log('data came in localaddtocart')
    console.log(data)
    let cartdata=[];
    let localcart=localStorage.getItem('localcart')
    if(!localcart)
    {
       
      localStorage.setItem('localcart',JSON.stringify([data]))


      console.log('data stored in localstoarge')



    }
    else
    {



    /*if(executed)
     {

      cartdata.push(JSON.parse(localcart))
    executed=false
    }
*/

      cartdata=JSON.parse(localcart)
    

       console.log('this is cartdata')
      console.log(cartdata)
      cartdata.push(data)
      

      console.log('this is cartdata after pushing data')
      console.log(cartdata)
    
      localStorage.setItem('localcart',JSON.stringify(cartdata))
    }
    this.cartdata.emit(cartdata)
  }

removetocart(id:number,userid)
{
  let cartdata=localStorage.getItem('localcart')
  if(cartdata)
  {

    let items:product[]=JSON.parse(cartdata)
     items=items.filter((item:product)=>{return id!=item.prouductid})

     
     console.log('see below is there the item avoided ')

    console.log(items)
    }

    if(localStorage.getItem('user'))
    {


      console.log('inside user condition of removecart service')
      console.log(id)
         
      let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com'

      const url=`${baseurl}/cart.json?orderBy="prouductid"&equalTo=${id}`
      this.http.get(url).subscribe((result)=>{

           for(let key in result)
           {
             console.log(key)
             
      
            this.http.delete('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/cart/'+key+'.json').subscribe((data)=>{

          })

      this.getcartitems(userid)

           }

           
       
      

})  
      
         
      //   this.http.delete('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/cart.json?orderBy="prouductid&equalTo=id"')

    }



  }

addtocartuser(cartdata:cart)
{
 

return this.http.post('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/cart.json',cartdata)

}

getcartitems(userid:string)
{

 let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com'

 const url=`${baseurl}/cart.json?orderBy="userid"&equalTo="${userid}"`
      
 

 return this.http.get<cart[]>(url).subscribe((result:cart[])=>{


     this.usercartdata.emit(Object.values(result))
     

 
})
}
getcartitems1(userid:string)
{
  let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com'
 
  const url=`${baseurl}/cart.json?orderBy="userid"&equalTo="${userid}"`
       
 
  return this.http.get(url)

}
orders(data:order)
{


 return this.http.post('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/orders.json',data)

}
getorderdata(userid:string)
{


  let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com'
 
  const url=`${baseurl}/orders.json?orderBy="userid"&equalTo="${userid}"`

 return  this.http.get<order[]>(url)
}


deletecartitemsoncheckout(userid:string)
{  

  console.log('call to deletcartitem form order page')
  console.log(userid)
  let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com'
 
  const url=`${baseurl}/cart.json?orderBy="userid"&equalTo="${userid}"`

  this.http.get(url).subscribe((result)=>{


    console.log(result)


  for(let key in result)
  {
    console.log('this is key')
    setTimeout(()=>{
       

      this.http.delete('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/cart/'+key+'.json').subscribe((data)=>{
  
  })


    },600)
    
    

}
  })
  this.usercartdata.emit([])


}

deletethisorder(id:number,userid:string)
{


  console.log(id)
  let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com'
 
  const url=`${baseurl}/orders.json?orderBy="userid"&equalTo="${userid}"`

  this.http.get(url).subscribe((result)=>
  {
        console.log(result)
       let arr=Object.values(result)
       console.log(arr)
    for(let item of arr)
    {


      if(item.userid==userid)
      {

        console.log('inside if')
        let baseurl1='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com'

        const url1=`${baseurl1}/orders.json?orderBy="id"&equalTo=${id}`





        this.http.get(url1).subscribe((result1)=>{
        console.log('this is')

           if(result1)
           {

           for(let key in result1)
           {
             setTimeout(()=>{
              this.http.delete('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/orders/'+key+'.json').subscribe((result)=>{

            
            })},500)
          



           }
          }

        })
      }
    
            
      break

    }

  })
  

}
}
