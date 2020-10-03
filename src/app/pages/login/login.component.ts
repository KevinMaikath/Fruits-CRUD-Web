import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginSelected = true;

  constructor() {
  }

  ngOnInit(): void {
  }


  onLoginTypeSelect(loginSelected: boolean) {
    this.isLoginSelected = loginSelected;
  }
}
