import { HelperService } from './../../Helper/helper.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import Notiflix from 'notiflix';
@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {
  categoryId:string=``
  categoryObj:any={}
  isUpdate:boolean=false

  constructor(private activatedRoute:ActivatedRoute,private common:CommonService,
    private helper:HelperService,private route:Router
  ){
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params["id"];
      if (this.categoryId != "0") {
        this.isUpdate=true;
        this.GetCategoryDetails(this.categoryId);        
      } else {
        //console.log(this.specialisationId);
      }
    });
  }

  
  async UploadPicture(val:any){
    const file = val.target.files[0];    
    if(file.size<this.common.fileMaxLogo){
      const base64Img = await this.helper.ConvertToBase64(file);
      this.categoryObj.picture=base64Img;
    }
    else{
      Notiflix.Report.failure(`Maximum file size is 50kb`,'','Okay',)
    }
  }

  async GetCategoryDetails(id:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetCategoryDetails(id)).data;
      this.categoryObj=response.data;
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
      let response=await (await this.common.UpsertCategory(this.categoryObj)).data
      this.route.navigate(['/user/list'])      
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

 
}
