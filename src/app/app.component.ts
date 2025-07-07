import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../Models/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_CRUD';

  EmployeeForm :FormGroup=new FormGroup({});
  EmployeeObj: Employee=new Employee();
  EmployeeList:Employee[]=[];
  
  constructor(){
    this.createForm()
    debugger;
    const oldData=localStorage.getItem("empData");
    if(oldData!=null){
      const parseData=JSON.parse(oldData);
      this.EmployeeList =parseData;
    }
  }
  createForm(){
    this.EmployeeForm=new FormGroup({
      EmpId :new FormControl(this.EmployeeObj.EmpId),
      Name:new FormControl(this.EmployeeObj.Name),
      EmailId:new FormControl(this.EmployeeObj.EmailId),
      City:new FormControl(this.EmployeeObj.City),
      ContactNo:new FormControl(this.EmployeeObj.ContactNo),
    })
  }

  OnSave(){
    debugger;
    const oldData=localStorage.getItem("empData");
    if(oldData!=null){
      const parseData=JSON.parse(oldData);
      this.EmployeeForm.controls['EmpId'].setValue(parseData.length +1);
      this.EmployeeList.unshift(this.EmployeeForm.value);
    }
    else{
      this.EmployeeList.unshift(this.EmployeeForm.value);
    }
    localStorage.setItem("empData",JSON.stringify(this.EmployeeList))
  }
  OnEdit(item:Employee){
    this.EmployeeObj=item;
    this.createForm();
  }
  OnUpdate(){
    const OldEmp= this.EmployeeList.find(m=>m.EmpId==this.EmployeeForm.controls['EmpId'].value);
    if(OldEmp!=undefined){
      OldEmp.Name=this.EmployeeForm.controls['Name'].value;
      OldEmp.EmailId=this.EmployeeForm.controls['EmailId'].value;
      OldEmp.ContactNo=this.EmployeeForm.controls['ContactNo'].value;
      OldEmp.City=this.EmployeeForm.controls['City'].value;
    }
    localStorage.setItem("empData",JSON.stringify(this.EmployeeList))
    this.EmployeeObj=new Employee();
    this.createForm();
  }
  OnDelete(id:number ){
    const IsDeleted= confirm("Do you really want to delete this employee ?")
    if(IsDeleted){
      const index=this.EmployeeList.findIndex(m=>m.EmpId== id);
      this.EmployeeList.splice(index,1);
      localStorage.setItem("empData",JSON.stringify(this.EmployeeList))
    }

  }
}
