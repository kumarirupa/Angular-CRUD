import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud';
  showHead = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log('rupa che ck componet', event['url'])
        if (event['url'] == '/login' || event['url'] == '/') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}

