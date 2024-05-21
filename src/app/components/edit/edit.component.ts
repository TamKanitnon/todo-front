import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatapassService } from 'src/app/services/datapass.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  todo = {
    title: this.datapass.edit.title,
    description: this.datapass.edit.description
  }

  constructor(
    private http: HttpClient,
    private datapass: DatapassService,
    private dialog: MatDialog,
  ) {}

  onCancel() {
    this.dialog.closeAll();
  }

  async editTitle() {
    if (this.todo.title === '') {
      this.dialog.closeAll();
      return;
    }
    const request: any = await this.http.patch(`${this.datapass.url}/todos/edit/${this.datapass.edit.id}`, this.todo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
    console.log(request);
    this.dialog.closeAll();
  }
}
