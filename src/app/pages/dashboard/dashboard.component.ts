import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { EditComponent } from 'src/app/components/edit/edit.component';
import { TodoComponent } from 'src/app/components/todo/todo.component';
import { DatapassService } from 'src/app/services/datapass.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  todos: any;
  email = this.datapass.email;

  constructor(
    private http: HttpClient,
    private datapass: DatapassService,
    private dialog: MatDialog,
  ) { this.downloadData(); }
  
  async downloadData() {
    this.todos = await this.http.get(`${this.datapass.url}/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
    console.log(this.todos);
  }

  async remove(id: string, index: number) {
    const request: any = await this.http.delete(`${this.datapass.url}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
    console.log(request);
    this.downloadData();
  }

  async editTitle(id: string, title: string, description: string) {
    this.datapass.edit = { id, title, description };
    const dialogRef = this.dialog.open(EditComponent, {
      width: '500px',
      hasBackdrop: true,
      role: 'dialog',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(() => this.downloadData());
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoComponent, {
      width: '500px',
      hasBackdrop: true,
      role: 'dialog',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(() => this.downloadData());
  }

  async statusChanged(id: string, status: string) {
    const request = await this.http.patch(`${this.datapass.url}/todos/${id}`, {status}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
    console.log(request);
  }

  async filterChanged(event: MatSelectChange) {
    const status = event.value;
    if (status === undefined) {
      this.downloadData();
      return;
    }
    this.todos = await this.http.get(`${this.datapass.url}/todos/group?status=${status}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
    console.log(this.todos);
  }
}
