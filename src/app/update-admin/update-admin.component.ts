import { Component, EventEmitter, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent {

  ProfilePicture:string="https://th.bing.com/th/id/OIP._x2YqKMtfxOjkfT8g9xIvQHaG5?rs=1&pid=ImgDetMain"
  adminStatus:boolean=false
  adminData:any=[]
  @Output()adminChangeEvent:any=new EventEmitter()

  constructor(private admin:AdminService,private toastr:ToastrService){

  }
  ngOnInit(){
    this.getAdminDetails()
    if(this.adminData.ProfileImage){
      this.ProfilePicture=this.adminData.ProfileImage
    }
  }

  getAdminDetails(){
    this.admin.getAdmin().subscribe((res:any)=>{
      this.adminData=res
      console.log(this.adminData)
    })
  }

  getFile(event:any){
    const file=event.target.files[0]
    console.log(file)
    let fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
console.log(event.target.result)
this.ProfilePicture=event.target.result
this.adminData.ProfileImage=event.target.result
    }

  }

  handleUpdateAdmin(){
    console.log(this.adminData)
    this.admin.updateAdmin(this.adminData).subscribe((res:any)=>{
    this.toastr.success("Admin Updates Successfully")
    this.adminStatus=false
     sessionStorage.setItem("adminDetails",JSON.stringify(this.adminData))
     this.adminChangeEvent.emit(this.adminData.username)
  },
  (err:any)=>{
    this.toastr.error(err)
  })

  }
  

  updateAdminConfirm(){

    this.adminStatus=true
    
  }
  onCancel(){
    this.adminStatus=false
  }

}
