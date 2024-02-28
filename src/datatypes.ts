export interface product
{
    productname:string,prouductid:number,imageurl:string,productprice:string,productsdescription:string,id:string,productquantity:number
    



}
export interface cart{

    productname:string,prouductid:number,imageurl:string,productprice:string,productsdescription:string,id:string,productquantity:number,
    userid:string


}
export interface summary
{

price:number,discount:number,tax:number,delivery:number,total:number


}
export interface order{
    email:string
    address:string
    contact:string
    totalprice:number
    userid:string
    id:number
}