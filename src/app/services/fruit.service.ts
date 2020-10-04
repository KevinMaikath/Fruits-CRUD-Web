import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {FruitModel} from '../models/fruit.model';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  private API_URL = `${environment.API_URL}/fruits`;

  constructor(private http: HttpClient) {
  }

  async getAll(): Promise<FruitModel[]> {
    try {
      return await this.http.get<FruitModel[]>(`${this.API_URL}`).pipe(take(1)).toPromise();
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async create(fruit: FruitModel): Promise<FruitModel> {
    try {
      return await this.http.post<FruitModel>(`${this.API_URL}`, {...fruit}).pipe(take(1)).toPromise();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async update(fruit: FruitModel): Promise<boolean> {
    try {
      const fruitID: number = fruit.id;
      delete fruit.id;
      await this.http.put(`${this.API_URL}/${fruitID}`, {...fruit}).pipe(take(1)).toPromise();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async delete(fruitID: number): Promise<boolean> {
    try {
      await this.http.delete(`${this.API_URL}/${fruitID}`).pipe(take(1)).toPromise();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
