import { CanActivateFn } from '@angular/router';
import { AdminService } from '../service/admin.service';
import {  inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const admin=inject(AdminService)
  const toastr=inject(ToastrService)
  const router=inject(Router)
  if(admin.isLoggedIn()){
    return true
  }
  else{
    toastr.warning("Operation Denied....Please Login!")
    router.navigateByUrl("/")
    return false
  }
};
