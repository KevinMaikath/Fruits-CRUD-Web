import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginSelected = true;
  loginForm: FormGroup;

  validationMessages = {
    username: [{type: 'required', message: 'VALIDATOR_REQUIRED'}],
    email: [
      {type: 'required', message: 'VALIDATOR_REQUIRED'},
      {type: 'pattern', message: 'VALIDATOR_INVALID_EMAIL'}
    ],
    password: [
      {type: 'required', message: 'VALIDATOR_REQUIRED'},
      {type: 'minlength', message: 'VALIDATOR_PASSWORD_MIN_LENGTH'}],
    password_confirmation: [
      {type: 'required', message: 'VALIDATOR_REQUIRED'},
      {type: 'password_mismatch', message: 'VALIDATOR_PASSWORD_MISMATCH'}
    ]
  };

  constructor() {
  }

  ngOnInit() {
    this.setFormGroup();
  }

  setFormGroup() {
    this.loginForm = new FormGroup({
      username: new FormControl(
        {disabled: true, value: ''},
        Validators.required
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      password_confirmation: new FormControl(
        {disabled: true, value: ''},
        [Validators.required, this.checkPasswords])
    });
  }

  onLoginTypeSelect(loginSelected: boolean) {
    if (this.isLoginSelected && !loginSelected) {
      this.loginForm.get('username').disable();
      this.loginForm.get('password_confirmation').disable();
    } else if (!this.isLoginSelected && loginSelected) {
      this.loginForm.get('username').enable();
      this.loginForm.get('password_confirmation').enable();
    }
    this.isLoginSelected = loginSelected;
  }

  checkPasswords(formGroup: FormGroup) {
    if (!formGroup.get('password_confirmation')) {
      return null;
    }
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('password_confirmation').value;
    return password === confirmPassword ? null : {password_mismatch: true};
  }

  onSubmit() {
    console.log('onSubmit', this.loginForm.valid);
  }
}
