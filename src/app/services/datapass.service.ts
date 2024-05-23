import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {
  url = environment.url;
  email = '';
  edit = { id: '', title: '', description: '' };
}