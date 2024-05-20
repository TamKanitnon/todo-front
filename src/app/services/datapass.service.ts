import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {
  url = 'http://147.50.231.83:3000/api';
  email = '';
}