import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() menu = true;
  @Input() name = '';

  constructor(private router: Router,) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
