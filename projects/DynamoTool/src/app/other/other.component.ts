import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
 Unauthorized: string;
  constructor() { }
  ngOnInit() {
    this.Unauthorized = localStorage.getItem('Unauthorized');
  }
}
