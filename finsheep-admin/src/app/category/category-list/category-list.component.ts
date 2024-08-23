import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonService } from 'src/service/common.service';
import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatPaginatorModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  searchValue:string=''
  currentPage:number=1
  categoryList:any=[]
  constructor(private common:CommonService,private router:Router){
    this.GetCategoryList(this.currentPage,this.searchValue);
  }

  async GetCategoryList(page:number,searchTerm:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetCategoryList(page,searchTerm)).data
      debugger;
      this.categoryList=response.data;
      this.currentPage=response.page;
      Notiflix.Loading.remove()
    } catch (error:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(error.response.data.message)
    }
  }

  SearchCategory(){
    if(this.searchValue.length>2)  this.GetCategoryList(this.currentPage,this.searchValue);
    if(this.searchValue.length==0) this.GetCategoryList(this.currentPage,``);
  }

  async EditCategory(id:string){
    this.router.navigate(['/*/category/',id])
  }

  async DeleteCategory(id:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.DeleteCategory(id)).data
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

}
