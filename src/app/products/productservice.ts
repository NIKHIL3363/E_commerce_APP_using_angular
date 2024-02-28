import { JsonPipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from "../../datatypes";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ 
    providedIn:'root'
  }
  )
export class Productservice
{
 popular=[]
 search=[]
    constructor(private http:HttpClient,private router:Router)
    {


    }


    gun(data:{productname:string,productid:number,imageurl:string,productprice:string,productdescription:string})
    {
        console.log('gun called')
        
        console.log(data)
        
        this.http.post('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json',data).subscribe((result)=>{

console.log(JSON.stringify(result))
})


    }

    productlist()
    {
        console.log("in product list")
      return this.http.get<product[]>('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json').pipe(map((res)=>{
       let prd:product[]=[]

       for(const key in res)
    {
      if(res.hasOwnProperty(key))
      {
         prd.push({...res[key],id:key})

      }



    }

return prd
      }



      ))
      


       
        
    }
    deleteproduct(id:string)
    {
   
console.log(id)

     return this.http.delete('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts/'+id+'.json').subscribe()
    }


    popularproduct()
    {
      /*console.log('call to pupular ')

       this.http.get('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json').pipe(map((res)=>{
      let popular:product[]=[]
      for(let i=0;i<=2;i++)
      {
        console.log('inside for loop')
        for(const key in res)
        {
          console.log('inside for ech')

          if(res.hasOwnProperty(key))
          {

        popular.push({...res[key],key})

          }
        console.log(popular)
        } 
      }

      return popular    

      }))
      */
      
     return this.http.get<product[]>('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json').pipe(map((res)=>{
       let prd1:product[]=[]
       let count=0
       for(const key in res)
    { 
      
      console.log('inside for each')
      if(res.hasOwnProperty(key)&&count<=3)
      {
        
         prd1.push({...res[key],id:key})
        
        count++;

      }
    


    }
  

return prd1
      }



      ))
      
    }


    trendingProduct()
    {

return this.http.get<product[]>('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json').pipe(map((res)=>{
       let prd2:product[]=[]
       
       for(const key in res)
    { 
      
      console.log('inside for each')
      if(res.hasOwnProperty(key))
      {
        
         prd2.push({...res[key],id:key})
        

      }
    


    }
  

return prd2
      }



      ))


    }


    suggestions(query:string)
    {
console.log('in suggestion of proudctservice')  
//const parameters=new HttpParams().set('Query','query')  
let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json'


const url=`${baseurl}?orderBy="productname"&startAt="${encodeURIComponent(query)}"&endAt="${encodeURIComponent(query)}\uf8ff"`;
//const url=`${baseurl}?query`;
return this.http.get<product[]>(url)
 
    }
    getSearchedProdocust(value:string)
    {
      let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json'


      const url=`${baseurl}?orderBy="productname"&startAt="${encodeURIComponent(value)}"&endAt="${encodeURIComponent(value)}\uf8ff"`;
      return this.http.get<product[]>(url)
       
    
    }
getSearchedProducts1(value:string)
    {
      let baseurl='https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts.json'

      const url=`${baseurl}?orderBy="productname"&startAt="${encodeURIComponent(value)}"&endAt="${encodeURIComponent(value)}\uf8ff"`;
      return this.http.get<product[]>(baseurl).pipe(map((result)=>{
       const prd4=[]
       const prd5=[]

       for(const key in result)
       {
         
        prd4.push({...result[key],key})

         

       }



       for(let i=0;i<prd4.length;i++)
{

console.log('insidefor')
 




//console.log(data[i].productname)


//let str:string=data[i].productname

if(prd4[i].productname===value)
  {
    console.log("inside if")


      console.log(prd4[i])
    


      return prd4[i]


       console.log("prd5"+prd5)
  }
}
  

       


      }
      
      ))



    
       



    }


  getSearchedProduct(key:string)
{


    return this.http.get<product>('https://e-commerce-angular-28ba2-default-rtdb.firebaseio.com/sellerproducts/'+key+'.json')



}



  }
  