import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonService } from 'src/service/common.service';
import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-item-size-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,MatPaginatorModule],
  templateUrl: './item-size-list.component.html',
  styleUrl: './item-size-list.component.scss'
})
export class ItemSizeListComponent {
  searchValue:string=''
  currentPage:number=1
  itemSizeList:any=[]

  constructor(private common:CommonService,private router:Router){
    debugger
    this.GetItemSizeList(this.currentPage,this.searchValue);
  }
  
  async GetItemSizeList(page:number,searchTerm:string){
    try {
      debugger
      Notiflix.Loading.circle()
      let response=(await this.common.GetItemSizeList(page,searchTerm)).data
      debugger;
      this.itemSizeList=response.data;
      this.currentPage=response.page;
      Notiflix.Loading.remove()
    } catch (error:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(error.response.data.message)
    }
  }

  SearchItemSize(){
    if(this.searchValue.length>2)  this.GetItemSizeList(this.currentPage,this.searchValue);
    if(this.searchValue.length==0) this.GetItemSizeList(this.currentPage,``);
  }

  async EditItemSize(id:string){
    this.router.navigate(['/*/size/',id])
  }

  async DeleteItemSize(id:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.DeleteItemSize(id)).data
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }
}
