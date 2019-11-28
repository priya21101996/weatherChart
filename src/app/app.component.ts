// In app.component.ts
import { Component } from '@angular/core';
import { DataService, Data } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent { 

  single: any[];
  info;
  fromDate = new Date(2015, 1, 1);    //default date
  toDate = new Date();    //default date
  minDate: Date;
  maxDate = new Date();   // today's date
  // startDate = new Date();   // today's date
  maxTemp: number;
  label: string;    //fromDate to toDate
  selectedMetrics: string;
  selectedLocation: string;
  
  constructor(public dataService: DataService) {
    this.selectedMetrics = 'Tmax';    //for storing user selected Metric value
    this.selectedLocation = 'UK';    //for storing user selected Location value
    let fromDateString = this.fromDate.toString();
    let toDateString = this.toDate.toString();
    this.label = fromDateString.slice(3, 15) + ' to ' + toDateString.slice(3, 15);
  }

  ngOnInit() {
    this.metricsAndLocationChanged();
  }

  metricsAndLocationChanged() {
    this.dataService.getURL(this.selectedMetrics, this.selectedLocation)
    .subscribe(data=> { this.info = data;
    this.maxTemp = this.calcMaxTemp();
    this.single = [{ 'name': this.selectedMetrics, value: this.maxTemp }];
    });
  }

  setMinDate(event: any) {
    this.minDate = event.target.value;
  }

  fromAndToDateChange(event: any) {
    let fromDateString = this.fromDate.toString();
    let toDateString = this.toDate.toString();
    this.label = fromDateString.slice(3, 15) + ' to ' + toDateString.slice(3, 15);
    this.maxTemp = this.calcMaxTemp();
    this.single = [{ 'name': this.selectedMetrics, value: this.maxTemp }];
  }

  calcMaxTemp() {
    let max = -100;
    this.info.forEach(element => {
      if (element.month >= (this.fromDate.getMonth() + 1) && element.year >= this.fromDate.getFullYear() &&
        element.month <= (this.toDate.getMonth() + 1) && element.year <= this.toDate.getFullYear() && max < element.value) {
        max = element.value;
      }
    });
    return max;
  }
}