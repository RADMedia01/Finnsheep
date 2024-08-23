import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonService } from 'src/service/common.service';
import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserRole } from 'src/app/app.constant';
@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  searchValue:string=''
  currentPage:number=1
  userList:any=[]
  userRole:any;
  constructor(private common:CommonService,private router:Router){
    this.userRole=UserRole;
    this.GetUserList(this.currentPage,this.searchValue);
  }

  async GetUserList(page:number,searchTerm:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetAllUserList(page,searchTerm)).data
      debugger;
      this.userList=response.data;
      this.currentPage=response.page;
      Notiflix.Loading.remove()
    } catch (error:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(error.response.data.message)
    }
  }

  SearchUser(){
    if(this.searchValue.length>2)  this.GetUserList(this.currentPage,this.searchValue);
    if(this.searchValue.length==0) this.GetUserList(this.currentPage,``);
  }

  async EditUser(id:string){
    this.router.navigate(['/user/',id])
  }

  async DeleteUser(id:string){
    try {
      let response=(await this.common.DeleteUser(id)).data
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }


}
