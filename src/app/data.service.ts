import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }
  
  getURL( selectedMetrics, selectedLocation) {
    let dataUrl = `https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/${selectedMetrics}-${selectedLocation}.json`;
    return this.http.get(dataUrl); 
  }
}

export interface Data {
  value: number;
  year: number;
  month: number;
}
