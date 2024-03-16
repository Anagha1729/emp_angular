import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})

export class EmpListComponent implements OnInit {
  employee:any=[]
  d:any=new Date()
  searchKey:any=""


  constructor(private admin:AdminService,private toastr:ToastrService){

  }
  ngOnInit() {
  this.getData()
    }

    getData(){
    this.admin.getEmployee().subscribe((res:any)=>{
      console.log(res)
      this.employee=res.filter((item:any)=>item.id!="1")
      console.log(this.employee)
    })
}

   handleDelete(id:any){
    this.admin.deleteEmployee(id).subscribe((res:any)=>{

      this.toastr.success("employee deleted successfully")
      this.getData()
      
    },((err:any)=>{
      this.toastr.error("failed")
    })
    )
  }

    exportToPdf(){
      let doc =new jsPDF()
        let head=[['empId','Username','Email','Status']]
        let body:any=[]
        this.employee.forEach((item:any)=>{
          body.push([item.empId,item.username,item.email,item.status])
        })
      doc.setFontSize(16)
      doc.text("All Employee List",10,10)
      autoTable(doc,{head,body})
      doc.output("dataurlnewwindow")
      doc.save("allemployee-pdf")
    
  }
     

sortByUserID(){
  this.employee.sort((user1:any,user2:any)=>user1.empId-user2.empId)
}
 sortByUsername(){
   this.employee.sort((user1:any,user2:any)=>user1.username.localeCompare(user2.username))
 }
}
