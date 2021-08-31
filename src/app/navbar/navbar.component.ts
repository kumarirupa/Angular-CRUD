import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = (JSON.parse(localStorage.getItem('userdata') || '{}').name)

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('userdata');
    this.router.navigate(['/login'])
  }

}
