import {Component, OnInit} from '@angular/core';
import {FruitModel, FruitSizeEnum} from '../../models/fruit.model';
import {FruitService} from '../../services/fruit.service';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.scss']
})
export class FruitListComponent implements OnInit {

  sizeDropdownOpen = false;
  fruitList: FruitModel[] = [];
  currentFruit: FruitModel = new FruitModel();
  fruitSizeOptions: string[] = [];

  editModeON = false;

  constructor(private fruitService: FruitService) {
  }

  ngOnInit(): void {
    this.getFruits();
    this.initFruitSizeOptions();
  }

  async getFruits() {
    this.fruitList = await this.fruitService.getAll();
  }

  initFruitSizeOptions() {
    this.fruitSizeOptions = Object.values(FruitSizeEnum);
  }

  onSizeDropdown() {
    this.sizeDropdownOpen = !this.sizeDropdownOpen;
  }

  onFruitSizeSelect(option: string) {
    this.currentFruit.size = option as FruitSizeEnum;
  }
}
