import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Notiflix from 'notiflix';
import { HelperService } from 'src/app/Helper/helper.service';
import { CommonService } from 'src/service/common.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productId:string=``
  product:any={}
  isUpdate:boolean=false
  categoryList:any[]=[]
  coverImage:any;
  coverImageFile:any;
  otherImageFile:any[]=[]
  otherImages:any[]=[]
  productSizeList:any[]=[]
  productSizeObject:any={
      length:0,
      height:0,
      width:0,
      retailPrice:0,
      quantity:0,
      size:``
  }
  
  constructor(private activatedRoute:ActivatedRoute,private common:CommonService,
    private route:Router,private helper:HelperService
  ){
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params["id"];
      if (this.productId != "0") {
        this.isUpdate=true;
        this.GetProductDetails(this.productId);        
      } else {
        //console.log(this.specialisationId);
      }
    });
    this.GetCategoryList()
  }

  async GetProductDetails(id:string){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetProductDetails(id)).data;
      debugger
      this.product=response.data;
      Notiflix.Loading.remove()
     // this.route.navigate(['/category/list'])
    }
    catch(err:any){
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  } 

  async GetCategoryList(){
    try {
      Notiflix.Loading.circle()
      let response=(await this.common.GetCategoryList(1,``)).data
      this.categoryList=response.data;
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }
  
  async UploadCover(event:any){
    const file = event.target.files[0];
    if(file.size<this.common.fileMaxLogo){      
      this.coverImage= file;
      const base64Img = await this.helper.ConvertToBase64(file);
      this.product.coverImage.image=base64Img;
      this.coverImageFile=file;
    }
    else{
      Notiflix.Report.failure(`Maximum file size is 1mb`,'','Okay',)
    }
  }

  async UploadOtherImages(event:any){
    const file = event.target.files[0];
    if(file.size<this.common.fileMaxLogo){
      const base64Img = await this.helper.ConvertToBase64(file);
      this.otherImageFile.push(file);
      this.product.otherImages.push({
        image:base64Img
      });     
    }
    else{
      Notiflix.Report.failure(`Maximum file size is 1mb`,'','Okay',)
    }
  }

  async OnFormSubmit(){
    try {
      Notiflix.Loading.circle()
      if(this.productSizeList.length>0) this.product.variations=this.productSizeList
      let response= (await this.common.UpsertProduct(this.product)).data
      debugger
      //this.route.navigate(['/product/list'])      
      Notiflix.Notify.success(response.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      debugger;
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

  async AddProductImages(){
    Notiflix.Loading.circle()
    try {
      if(this.coverImageFile && this.otherImageFile.length>0){
        const payload=new FormData();
        payload.append('coverImage', this.coverImageFile);    
        for (let i = 0; i < this.otherImageFile.length; i++) {
          payload.append('otherImages', this.otherImageFile[i]);
        }   
        let response=(await this.common.AddProductImage(this.productId,payload)).data;
        debugger
        
        Notiflix.Loading.remove()
        return Notiflix.Notify.success(response.message)
      }
      else{
        Notiflix.Loading.remove()
        Notiflix.Notify.failure(`Add files first`)
      }
     
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

  async DeleteFile(id:string){
    try {
      Notiflix.Loading.circle()
      let response=await (await this.common.DeleteProductImage(id)).data
      Notiflix.Loading.remove()
      Notiflix.Notify.success(response.message)
      window.location.reload()
      
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

  AddProductVariation(e:any){
    debugger
   
    if(!this.productSizeObject.width) return Notiflix.Notify.failure(`width is required`)
    if(!this.productSizeObject.length) return Notiflix.Notify.failure(`Length is required`)
    if(!this.productSizeObject.height) return Notiflix.Notify.failure(`Height is required`)
    if(!this.productSizeObject.retailPrice) return Notiflix.Notify.failure(`Retail Price is required`)
    if(!this.productSizeObject.quantity) return Notiflix.Notify.failure(`Quantity is required`)

    this.productSizeList.push(this.productSizeObject)
      //e.preventDefault()
      this.productSizeObject={}

    }

    async DeleteProductSize(id:string){
      try{
        debugger
        Notiflix.Loading.circle()
        let response=await (await this.common.DeleteVariation(id)).data
        Notiflix.Loading.remove()
        Notiflix.Notify.success(`Size deleted successfully`)
      }
      catch(err:any){
        Notiflix.Loading.remove()
        Notiflix.Notify.failure(err.response.data.message)
      }
    }

    RemoveProductSize(sizeObj:any){
        this.productSizeList=this.productSizeList
        .filter((element:any)=> element!=sizeObj )
    }

}
