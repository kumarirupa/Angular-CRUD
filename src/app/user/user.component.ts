import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface Class {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLoading = false;
  classes: Class[] = [
    { value: 1, viewValue: 'Class-1' },
    { value: 2, viewValue: 'Class-2' },
    { value: 3, viewValue: 'Class-3' }
  ]

  userForm: FormGroup = new FormGroup({})
  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      percentage: ['', Validators.required],
      year: ['', Validators.required]
    })
  }

  addStudent() {
    console.log('rupa :::::1111', this.userForm.valid)
    if (this.userForm.valid) {
      this.isLoading = true;
      const obj = {
        'name': this.userForm.value.name,
        'standard': this.userForm.value.class,
        'percentage': this.userForm.value.percentage,
        'passingYear': this.userForm.value.year
      }
      this.studentService.addStudent(obj).subscribe(result => {
        this.isLoading = false;
        if (result.code == 200) {
          this.userForm.reset();
          this.openSnakbar('Registered Successfully');
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
