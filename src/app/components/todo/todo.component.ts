import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatapassService } from 'src/app/services/datapass.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todo = {
    title: '',
    description: '',
  }

  constructor(
    private http: HttpClient,
    private datapass: DatapassService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  onCancel() {
    this.dialog.closeAll();
  }

  async create() {
    if (this.todo.title === '') {
      this.dialog.closeAll();
      return;
    }
    const request: any = await this.http.post(`${this.datapass.url}/todos`, this.todo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
    console.log(request);
    this.dialog.closeAll();
  }
}
