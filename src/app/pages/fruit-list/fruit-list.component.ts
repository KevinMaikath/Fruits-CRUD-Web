import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.scss']
})
export class FruitListComponent implements OnInit {

  sizeDropdownOpen = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSizeDropdown() {
    this.sizeDropdownOpen = !this.sizeDropdownOpen;
  }
}
