import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('rupa che ck animal:::', this.data)
  }

  ngOnInit(): void {
  }

  deleteStudent() {
    const obj = {
      'id': this.data,
    }
    this.studentService.deleteStudent(obj).subscribe(result => {
      if (result.code == 200) {
        this.matDialog.closeAll();
        this.openSnakbar('Deleted Successfully');
      }
    }, error => {
      this.isLoading = false;
      this.openSnakbar(error.error.message);
    })
  }

  openSnakbar(msg: any) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this._snackBar.open(msg, "Done", config);
  }
}
