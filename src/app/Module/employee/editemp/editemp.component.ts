import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { UserSchema } from '../schemas/Userschema';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrls: ['./editemp.component.css']
})
export class EditempComponent implements OnInit {
  id:string=""
  user:UserSchema={}
  constructor(private aroute:ActivatedRoute,private admin:AdminService,private toastr:ToastrService,private r:Router){
    this.aroute.params.subscribe((res:any)=>{
      console.log(res)
      this.id=res.id
      console.log(this.id)
    })
  }
  ngOnInit() {
    this.admin.getSpecificEmployee(this.id).subscribe((res:any)=>{
      console.log(res)
      this.user.empId=res.empId
      this.user.username=res.username
      this.user.email=res.email
      this.user.status=res.status
      console.log(this.user)
    })
    
  }
   handleUpdate(){
    console.log(this.user)
    const {empId,username,email,status}=this.user
    if(username&&email&&empId&&status){
      this.admin.updateEmployee(this.user,this.id).subscribe((res:any)=>{
        console.log(res)
        this.toastr.success("Employee Updation Successfully")
        this.r.navigateByUrl("/employee")
      },
      (err:any)=>{
        this.toastr.error("Employee Updation Failed")
      })
        
      }
    else{
      this.toastr.info("enter valid data")
    }
    }

   }



