import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import Notiflix from 'notiflix';
import { CommonService } from 'src/service/common.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CKEditorModule,FormsModule,CommonModule,],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
  blogDetails:any={
   
  }

  blogId:string=''
 public editor:any=ClassicEditor;
  @ViewChild('description', { static: false }) ckeditor: any;
  updateForm:boolean=false;
  constructor(private common:CommonService,private route:Router,private activatedRoute: ActivatedRoute) { 
    this.InitEditor()
    this.activatedRoute.params.subscribe((params) => {
      this.blogId = params["id"];
      if (this.blogId != "0") {
        this.GetBlogDetails(this.blogId);        
      } else {
        //console.log(this.specialisationId);
      }
    });
  }

 InitEditor(){
  this.editor.create(document.getElementById('description')).then((editor:any) => {
    this.editor = editor;
  }).catch((error:any) => {
    console.error(error);
  });
 }

  onEditorChange(val:any){
    this.blogDetails.body=val.target.value;
  }
 

 async GetBlogDetails(val:string){
    try {
      Notiflix.Loading.circle()
      let response=await (await this.common.GetBlogDetails(val)).data
      this.blogDetails=response.data;
      this.ckeditor.data=this.blogDetails.body;
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message);
    }
      
  }

  async OnFormSubmit(){
    try {
      Notiflix.Loading.circle()
      this.blogDetails.body=this.ckeditor.data;
      let response=await (await this.common.UpSertBlog(this.blogDetails)).data
      this.route.navigate(['/blogs'])      
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }



}
