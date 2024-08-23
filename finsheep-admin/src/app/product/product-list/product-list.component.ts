import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import Notiflix from 'notiflix';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatPaginatorModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  searchValue:string=''
  currentPage:number=1
  productList:any=[]
  categoryList:any[]=[]
  category:string=``
   constructor(private common:CommonService){
    this.GetProducts(this.searchValue,this.currentPage,this.category);  
    this.GetCategories();
  }

  async GetProducts(searchTerm:string,page:number,category:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetProductList(page,searchTerm,category)).data;
    
      this.productList=response.data;
      debugger;
      Notiflix.Loading.remove()
    } catch (error:any) {
     // debugger
      Notiflix.Loading.remove()
      if(error.code=='ERR_NETWORK') return Notiflix.Notify.failure('ERR_NETWORK')
      
      Notiflix.Notify.failure(error.response.data.message)
    }
    
    
   
   
  }

  async GetCategories(){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetCategoryDropdown()).data;
      //debugger;
      this.categoryList=response.data;
      Notiflix.Loading.remove()
    } catch (err:any) {
      debugger;
      Notiflix.Loading.remove()
      if(err.code=='ERR_NETWORK') return Notiflix.Notify.failure('ERR_NETWORK')      
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

  async GetFilteredProducts(){
   if(this.category) this.GetProducts(``,this.currentPage,this.category);
  }

  async DeleteProduct(id:string){
    try {
      let response=(await this.common.DeleteProduct(id)).data
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

  ClearCategory(){
   this.category=`` 
   this.GetProducts(``,this.currentPage,``)
  }

  
  SearchProduct(){
    if(this.searchValue.length>2)  this.GetProducts(this.searchValue,this.currentPage,this.category);
    if(this.searchValue.length==0) this.GetProducts(``,this.currentPage,this.category);
  }
}
