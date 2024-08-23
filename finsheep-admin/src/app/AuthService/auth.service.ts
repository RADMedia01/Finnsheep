import { Injectable } from '@angular/core';
import { CommonService } from 'src/service/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorage: Storage | undefined;
  constructor(private common:CommonService) { 

  }

  setIsLoggedIn(value: boolean) {
    this.common.isLoggedInSubject.next(value);
  }

  SetLoggedUser(userObj:any){
    localStorage.setItem('user',JSON.stringify(userObj))
  }

  GetLoggedUser(){
    let user=localStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    }
    else return null;
  }

  RemoveLoggedUser(){ 
    localStorage.removeItem('user');
  }

}
