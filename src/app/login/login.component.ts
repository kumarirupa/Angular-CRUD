import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface Admin {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  admins: Admin[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' }
  ];

  LoginForm: FormGroup = new FormGroup({})
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ls: LoginServiceService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.generateForm();
  }


  generateForm() {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      loginType: ['', Validators.required]
    })
  }

  loginProcess() {
    if (this.LoginForm.valid) {
      this.isLoading = true;
      const obj = {
        'username': this.LoginForm.value.username,
        'password': this.LoginForm.value.password,
        'loginType': this.LoginForm.value.loginType
      }
      console.log('loginform', this.LoginForm)
      this.ls.login(obj).subscribe(result => {
        console.log('rups:::', result)
        this.isLoading = false;
        if (result.code == 200) {
          this.setUserDataLocalStorage(obj.username, result)
          if (obj.loginType == 'admin') {
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/user'])
          }
        }
      }, error => {
        this.isLoading = false;
        this.openSnakbar(error.error.message);
      })
    }
  }

  setUserDataLocalStorage(name: string, data: any) {
    const obj = {
      name: name,
      token: data.result.jwtToken
    }
    localStorage.setItem('userdata', JSON.stringify(obj))
  }

  openSnakbar(msg: any) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this._snackBar.open(msg, "Done", config);
  }
}
