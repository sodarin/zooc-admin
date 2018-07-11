import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  date = new Date();

  constructor() { }

  ngOnInit() {
  }

  onValueChange(value: Date): void {
    this.date = value;
  }

}
