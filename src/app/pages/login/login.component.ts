import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginSelected = true;
  loginForm: FormGroup;
  showInvalidCredentialsError = false;
  showEmailAlreadyInUseError = false;

  validationMessages = {
    name: [{type: 'required', message: 'VALIDATOR_REQUIRED'}],
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

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.setFormGroup();
  }

  setFormGroup() {
    this.loginForm = new FormGroup({
      name: new FormControl(
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
      this.loginForm.get('name').enable();
      this.loginForm.get('password_confirmation').enable();
      this.showInvalidCredentialsError = false;
    } else if (!this.isLoginSelected && loginSelected) {
      this.loginForm.get('name').disable();
      this.loginForm.get('password_confirmation').disable();
      this.showEmailAlreadyInUseError = false;
    }
    this.isLoginSelected = loginSelected;
  }

  checkPasswords(formControl: FormControl) {
    if (formControl.disabled) {
      return null;
    }
    const password = formControl.parent.get('password').value;
    const confirmPassword = formControl.value;
    return password === confirmPassword ? null : {password_mismatch: true};
  }

  async onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    let success = false;
    if (this.isLoginSelected) {
      const {email, password} = this.loginForm.value;
      success = await this.authService.login(email, password);
    } else {
      const {name, email, password, password_confirmation} = this.loginForm.value;
      success = await this.authService.register(name, email, password, password_confirmation);
    }

    if (success) {
      this.router.navigate(['/fruit-list'], {replaceUrl: true});
    } else {
      if (this.isLoginSelected) {
        this.showInvalidCredentialsError = true;
      } else {
        this.showEmailAlreadyInUseError = true;
      }
    }
  }
}
