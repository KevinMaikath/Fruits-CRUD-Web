import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = `${environment.API_URL}`;
  private token: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response: any = await this.http.post(`${this.API_URL}/login`, {email, password}).pipe(take(1)).toPromise();
      if (response.token) {
        this.token.next(response.token);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // tslint:disable-next-line:variable-name
  async register(name: string, email: string, password: string, password_confirmation: string) {
    try {
      const response: any = await this.http
        .post(`${this.API_URL}/register`, {name, email, password, password_confirmation})
        .pipe(take(1))
        .toPromise();
      if (response.token) {
        this.token.next(response.token);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async checkToken() {
    try {
      await this.http.get(`${this.API_URL}/protectedTest`, {}).pipe(take(1)).toPromise();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getToken(): Observable<string> {
    return this.token;
  }

  getTokenValue(): string {
    return this.token.getValue();
  }

}
