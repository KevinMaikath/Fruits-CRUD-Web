import {Component, OnInit} from '@angular/core';
import {FruitModel, FruitSizeEnum} from '../../models/fruit.model';
import {FruitService} from '../../services/fruit.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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

  constructor(private fruitService: FruitService,
              private authService: AuthService,
              private router: Router) {
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

  onReset() {
    this.currentFruit.name = '';
    this.currentFruit.size = FruitSizeEnum.SMALL;
    this.currentFruit.colour = '';
  }

  onCreateNew() {
    this.currentFruit = new FruitModel();
    this.editModeON = false;
  }

  async onSubmit() {
    if (this.editModeON) {
      await this.fruitService.update(this.currentFruit);
    } else {
      await this.fruitService.create(this.currentFruit);
    }

    this.getFruits();
  }

  onFruitEdit(fruit: FruitModel) {
    // Create a copy instead of getting the reference
    this.currentFruit = JSON.parse(JSON.stringify(fruit));
    this.editModeON = true;
  }

  async onDelete(fruitID: number) {
    await this.fruitService.delete(fruitID);
    this.getFruits();
  }

  isFormValid(): boolean {
    return this.currentFruit.name && !!this.currentFruit.size;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
