import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatapassService } from 'src/app/services/datapass.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private datapass: DatapassService,
    private router: Router,
  ) {}

  async login(loginForm: NgForm) {
    const member: {
      email: string,
      password: string
    } = loginForm.form.value;

    const request: any = await this.http.post(`${this.datapass.url}/auth/login`, member).toPromise();
    console.log(request);
    localStorage.setItem('token', request.token);
    this.datapass.email = request.email;
    this.router.navigateByUrl('/dashboard');
  }
}
