import { HelperService } from './../../Helper/helper.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import Notiflix from 'notiflix';
import { CommonService } from 'src/service/common.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-item-size-details',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,MatAutocompleteModule],
  templateUrl: './item-size-details.component.html',
  styleUrl: './item-size-details.component.scss'
})
export class ItemSizeDetailsComponent {
  itemSizeId:string=``
  itemSizeObj:any={}
  isUpdate:boolean=false
  productList:any[]=[];
  searchValue:string=``



  constructor(private common:CommonService,private helper:HelperService,
    private route:Router,private activatedRoute:ActivatedRoute){
      this.GetProductsDropdown()
      this.activatedRoute.params.subscribe((params) => {
        this.itemSizeId = params["id"];
        if (this.itemSizeId != "0") {
          this.isUpdate=true;
          this.GetItemSizeDetails(this.itemSizeId);        
        } else {
          //console.log(this.specialisationId);
        }
      });
  }

  async OnFormSubmit(){
    try {
      Notiflix.Loading.circle()
      debugger;
      let response=await this.common.UpsertItemSize(this.itemSizeObj)
      debugger;
      this.route.navigate(['/size/list'])      
      Notiflix.Notify.success(response.data.message)
      Notiflix.Loading.remove()
    } catch (err:any) {
      debugger;
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

  async GetProductsDropdown(){
    try {
      Notiflix.Loading.circle()
      let response=await (await this.common.GetProductDropdown()).data
      this.productList=response.data;
      Notiflix.Loading.remove()
      
    } catch (err:any) {
      debugger;
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)
    }
  }

  async GetItemSizeDetails(id:string){
    try {
      Notiflix.Loading.circle()
      let response=await (await this.common.GetItemSizeDetails(id)).data
      this.itemSizeObj=response.data;
      Notiflix.Loading.remove()
    } catch (err:any) {
      Notiflix.Loading.remove()
      Notiflix.Notify.failure(err.response.data.message)     
    }
  }

  ProductSelect(val:any){
    debugger
      this.itemSizeObj.product=val.target.value;
  }


}
