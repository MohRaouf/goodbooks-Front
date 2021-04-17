import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shelf-menu',
  templateUrl: './shelf-menu.component.html',
  styleUrls: ['./shelf-menu.component.css']
})
export class ShelfMenuComponent implements OnInit {

  constructor() { }
  @Input() options:any

  ngOnInit(): void {
  }

}
