import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.setAuthToken();
    this.setLanguage();
  }

  setAuthToken() {
    this.authService.setTokenFromSession();
  }

  /**
   * Set the current app language for translations.
   * If the browser's language is not supported, use a default language.
   */
  setLanguage() {
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.translateService.getBrowserLang());
  }
}
