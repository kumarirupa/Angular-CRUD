import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../component/edit-user/edit-user.component';
import { DeleteUserComponent } from '../component/delete-user/delete-user.component'
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allStudentData: any = [];
  loader = false;

  constructor(public dialog: MatDialog,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getAllStudent();
  }

  openDialog(student: {}) {
    console.log('rupa student:::', student)
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: student
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllStudent();
    });
  }

  openConfirmDialog(id: {}) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '600px',
      data: id
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllStudent();
    });
  }

  getAllStudent() {
    this.loader = true;
    this.studentService.getAllStudent().subscribe(result => {
      this.loader = false;
      if (result.code == 200) {
        console.log('rupa che kc result::', result.result)
        this.allStudentData = result.result.data
      } else {
        alert(result.message);
      }
    })
  }
}
