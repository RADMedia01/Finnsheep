import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Notiflix from 'notiflix';
import { AddressObject } from 'src/app/app.constant';
import { HelperService } from 'src/app/Helper/helper.service';
import { CommonService } from 'src/service/common.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  userId:string=``
  userDetailsObj:any={}
  isUpdate:boolean=false
 

  constructor(private activatedRoute:ActivatedRoute,private common:CommonService,
    private route:Router,private helper:HelperService
  ){
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params["id"];
      if (this.userId != "0") {
        this.isUpdate=true;
        this.GetUserDetails(this.userId);        
      } else {
        //console.log(this.specialisationId);
      }
    });
  }

  async UploadPicture(val:any){
    const file = val.target.files[0];    
    if(file.size<this.common.fileMaxLogo){
      const base64Img = await this.helper.ConvertToBase64(file);
      this.userDetailsObj.picture=base64Img;
    }
    else{
      Notiflix.Report.failure(`Maximum file size is 50kb`,'','Okay',)
    }
  }

  async GetUserDetails(id:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetUserDetails(id)).data;
      this.userDetailsObj=response.data;
      Notiflix.Loading.remove()
     // this.route.navigate(['/category/list'])
    }
    catch(err:any){
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  } 

  async OnFormSubmit(){
    try {
      Notiflix.Loading.circle()
      debugger
      let response=await (await this.common.UpsertUser(this.userDetailsObj)).data

      this.route.navigate(['/user/list'])      
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }



}
