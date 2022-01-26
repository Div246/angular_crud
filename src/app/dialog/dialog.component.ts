import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  btnValue: string = 'Save'
  genders = ["Male","Female","Others"]
  userForm !: FormGroup;
  // interest = ["study","sport","entertainment"];

  constructor(private fb: FormBuilder, private api : ApiService,  @Inject(MAT_DIALOG_DATA) public toEdit:any,
  private dialogRef: MatDialogRef<DialogComponent>) {
    };
  


    // selectedInterest(){
    //   const arr = this.interest.map(element =>{
    //     return this.fb.control(false)
    //   });
    //   return this.fb.array(arr)
    // }


  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      address: ['', Validators.required],
      contactNo: ['', Validators.required],
      gender0: ['', Validators.required],
      dob: ['', Validators.required],
      qualification: ['', Validators.required]
      // interests: this.selectedInterest()
    })

    if(this.toEdit){
      this.btnValue = 'Update'
      this.userForm.controls['userName'].setValue(this.toEdit.userName)
      this.userForm.controls['address'].setValue(this.toEdit.address)
      this.userForm.controls['contactNo'].setValue(this.toEdit.contactNo)
      this.userForm.controls['gender0'].setValue(this.toEdit.gender0)
      this.userForm.controls['dob'].setValue(this.toEdit.dob)
      this.userForm.controls['qualification'].setValue(this.toEdit.qualification)
    }
  }

  addUserData(){
    if(!this.toEdit){
      if(this.userForm.valid){
        this.api.saveData(this.userForm.value)
        .subscribe({
          next:(res)=>{
            alert('User data is successfully added')
          },
          error:()=>{
            alert('Error while adding user data')
          }  
        })
      }  
    }else{
     this.updateData()
    }
  }
updateData(){
  this.api.putData(this.toEdit.id,this.userForm.value)
  .subscribe({
    next:(res)=>{
      alert('User data is successfully updated')
      this.userForm.reset()
      this.dialogRef.close('update')
    },
    error:(err)=>{
      console.log(err);
      
    }  
  })
}
}

