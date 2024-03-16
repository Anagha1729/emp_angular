import { Component } from '@angular/core';
import { UserSchema } from '../schemas/Userschema';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent {
  constructor(private admin:AdminService,private toastr:ToastrService,private r:Router){

  }
  user:UserSchema={}

cancel(){
  this.user.empId=""
  this.user.email=""
  this.user.username=""
  this.user.status=""
  this.r.navigateByUrl('/employee')
}

getAddedData(){
  console.log(this.user)
  this.admin.addEmployeeDetails(this.user).subscribe((res:any)=>{
    console.log(res)
    this.toastr.success('Employee Details Successfully Added')
    this.cancel()
  },
  (err)=>{
    console.log(err,"error")
    this.toastr.error("something went wrong! employee registration failed")
  })
}

}
