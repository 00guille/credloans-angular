import { Component } from '@angular/core';
import { RestService } from './services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'credloans';

  constructor(private router: Router, private rs: RestService) {
    
    
  }

  toLogin() {
    this.rs.msg = null;
    this.router.navigateByUrl("/Login")
  }
}
