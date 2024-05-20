import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatapassService } from 'src/app/services/datapass.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private http: HttpClient,
    private datapass: DatapassService,
    private router: Router,
  ) {}
  
  async registerUser(registerForm: NgForm) {
    const member: {
      email: string,
      password: string,
      passconf: string
    } = registerForm.form.value
    
    const request: any = await this.http.post(`${this.datapass.url}/auth/register`, member).toPromise();
    console.log(request);
    alert('You have successfully registered. Please visit the login page to log in.');
    this.router.navigateByUrl('/login');
  }
}
