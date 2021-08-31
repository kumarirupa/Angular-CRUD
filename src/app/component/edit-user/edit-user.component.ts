import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface Class {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  isLoading = false;
  classes: Class[] = [
    { value: 1, viewValue: 'Class-1' },
    { value: 2, viewValue: 'Class-2' },
    { value: 3, viewValue: 'Class-3' }
  ]

  editUserForm: FormGroup = new FormGroup({})
  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('rupa che ck animal:::', this.data)
  }

  ngOnInit(): void {
    this.generateForm();
    this.setFormData();

  }

  generateForm() {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      percentage: ['', Validators.required],
      year: ['', Validators.required]
    })
  }

  setFormData() {
    this.editUserForm.controls.name.setValue(this.data.name);
    this.editUserForm.controls.class.setValue(this.data.standard);
    this.editUserForm.controls.percentage.setValue(this.data.percentage);
    this.editUserForm.controls.year.setValue(this.data.passingYear);
  }

  updateStudent() {
    if (this.editUserForm.valid) {
      const obj = {
        '_id': this.data._id,
        'name': this.editUserForm.value.name,
        'standard': this.editUserForm.value.class,
        'percentage': this.editUserForm.value.percentage,
        'passingYear': this.editUserForm.value.year
      }
      this.studentService.updateStudent(obj).subscribe(result => {
        if (result.code == 200) {
          this.matDialog.closeAll();
          this.openSnakbar('Updated Successfully');
        }
      }, error => {
        this.isLoading = false;
        this.openSnakbar(error.error.message);
      })
    }
  }

  openSnakbar(msg: any) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this._snackBar.open(msg, "Done", config);
  }
}
