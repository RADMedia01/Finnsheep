import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppConstants } from '../app/app.constant';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  localStorage: Storage | undefined;
  public isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initialize with default value
  isLoggedIn$: Observable<boolean>;
  itemLimit:number=10
  currentUserId: string = '';
    logoMaxSize = 50000; //50kb
    fileMaxLogo=1024*1024; //1mb
  constructor() {
    this.isLoggedIn$=this.isLoggedInSubject.asObservable();
    this.setIsLoggedIn(this.IsLoggedIn()); // Use setIsLoggedIn method to set the initial value
    
  }

//state and city api

GetStateList(country:string){
  const payload = {
    "country":country
   };
  return axios.post(`https://countriesnow.space/api/v0.1/countries/states`,payload);

}
GetCityList(country:string,state:string){
  const payload={
    "country": country,
    "state": state
}
  return axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`,payload);

}


//-------------------- login apis---------------------
  setIsLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  LogOut(){
    localStorage.removeItem('loggedAdminUser')
    this.setIsLoggedIn(false);
  }

  //check user login status
  IsLoggedIn(): boolean {
    if(localStorage.getItem('loggedAdminUser')){
      return true;
    }
    else return false;
  }

  GetLoggedUser(){
    let user=localStorage.getItem('loggedAdminUser');
    if(user){
      return JSON.parse(user);
    }
    else return null;
  }
  SetLoggedUser(userObj:any){
    localStorage.setItem('loggedAdminUser',JSON.stringify(userObj))
  }

  

  Login(userObj:any){
    this.SetLoggedUser(userObj); //saving user in local storage
    this.setIsLoggedIn(true); //updating global state variable
  }
  //----------------------------------------------------------------->



  

 // ------------------------user apis ---------------------------------->
  //user apis
   GetAllUserList(pageNo:Number,search:string){
     return axios.get(`${AppConstants.baseUrl}${AppConstants.getAllUserList}?page=${pageNo}&search=${search}`);
   }

  GetUserDetails(id:any){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.getUserDetails}${id}`);
  }

  UpsertUser(data:any){
    return axios.put(`${AppConstants.baseUrl}${AppConstants.addUpdateUser}`,data);
  }
  AdminLogin(data:any){
    return axios.post(`${AppConstants.baseUrl}${AppConstants.login}`,data);
  }

  // DropdownUserList(){
  //   return axios.get(`${AppConstants.baseUrl}${AppConstants.dropdownList}`);
  // }

  DeleteUser(id:any){
    return axios.delete(`${AppConstants.baseUrl}${AppConstants.deleteUser}${id}`);
  }

  //------------------------ blog api -------------------->
  GetBlogList(pageNo:Number,search:string){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.blogList}?page=${pageNo}&search=${search}`);
  }

  GetBlogDetails(id:any){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.blogDetails}${id}`);
  }

  UpSertBlog(data:any){
    return axios.put(`${AppConstants.baseUrl}${AppConstants.upsertBlog}`,data);
  }

  DeleteBlog(id:any){
    return axios.delete(`${AppConstants.baseUrl}${AppConstants.deleteBlog}${id}`);
  }


  //------------------------ category api -------------------->
  GetCategoryList(pageNo:Number,search:string){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.categoryList}?page=${pageNo}&search=${search}`);
  }

  GetCategoryDetails(id:any){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.categoryDetails}${id}`);
  }

  UpsertCategory(data:any){
    return axios.put(`${AppConstants.baseUrl}${AppConstants.upsertCategory}`,data);
  }


  DeleteCategory(id:any){
    return axios.delete(`${AppConstants.baseUrl}${AppConstants.deleteCategory}${id}`);
  }

  GetCategoryDropdown(){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.categoryDropdown}`);
  }
  //------------------- product apis --------------------------------------------------------


  GetProductList(pageNo:Number,search:string,category:string){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.productList}?page=${pageNo}&search=${search}&category=${category}`);
  }

  GetProductDetails(id:any){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.productDetails}${id}`);
  }

  UpsertProduct(data:any){
    return axios.put(`${AppConstants.baseUrl}${AppConstants.upsertProduct}`,data);
  }


  DeleteProduct(id:any){
    return axios.delete(`${AppConstants.baseUrl}${AppConstants.deleteProduct}${id}`);
  }

  AddProductImage(id:string,payload:any){
    return axios.post(`${AppConstants.baseUrl}${AppConstants.addProductImage}${id}`,payload);
  }

  DeleteProductImage(id:string){
    return axios.delete(`${AppConstants.baseUrl}${AppConstants.deleteProductImage}${id}`);
  }
  GetProductDropdown(){
    return axios.get(`${AppConstants.baseUrl}${AppConstants.productDropdown}`);
  }
 //------------------------ variation api -------------------->


DeleteVariation(id:any){
  return axios.delete(`${AppConstants.baseUrl}${AppConstants.deleteVariation}${id}`);
}


//----------------- orders api ----------------------------------------------------------------


CreateNewOrder(data:any){
  return axios.post(`${AppConstants.baseUrl}${AppConstants.newOrder}`,data);
}
GetAllOrders(){
  return axios.get(`${AppConstants.baseUrl}${AppConstants.getAllOrders}`);
}
GetUserOrders(userId:string){
  return axios.get(`${AppConstants.baseUrl}${AppConstants.getUserOrder}${userId}`);
}
CancelOrder(orderId:string){
  return axios.get(`${AppConstants.baseUrl}${AppConstants.cancelOrder}${orderId}`);
}


//-------------------------------------- Order api ----------------------------------------------------------------

// -------------------- payment api -------------------

NewPayment(orderId:string,data:any){
  return axios.post(`${AppConstants.baseUrl}${AppConstants.newPayment}${orderId}`,data);
}

//Stock bulk upload
// StockBulkUpload(productId:string, data:any)

}

