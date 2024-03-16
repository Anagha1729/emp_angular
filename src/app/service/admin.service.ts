import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSchema } from '../Module/employee/schemas/Userschema';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  base_url="http://localhost:3000"

  constructor(private http:HttpClient) { }
  getAdminDetails(){
    return this.http.get(`${this.base_url}/employee/1`)
  }
  addEmployeeDetails(data:any){
    return this.http.post(`${this.base_url}/employee`,data)
}

getEmployee(){
  return this.http.get(`${this.base_url}/employee`)
}
getSpecificEmployee(id:any){
  return this.http.get(`${this.base_url}/employee/${id}`)
}

updateEmployee(data:any,id:any){
  return this.http.put(`${this.base_url}/employee/${id}`,data)
}
deleteEmployee(id:any){
  return this.http.delete(`${this.base_url}/employee/${id}`)
}
getAdmin(){
  return this.http.get(`${this.base_url}/employee/1`)
}
updateAdmin(data:any){
  return this.http.put(`${this.base_url}/employee/1`,data)
}
isLoggedIn(){
  return !!sessionStorage.getItem("adminDetails")
}
}
