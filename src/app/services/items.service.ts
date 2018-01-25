import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { ChangeService } from './change.service';
import { Item } from '../models/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemsService {

  constructor(
    private http: HttpClient,
    private changeService: ChangeService
  ) { }

  private apiUrl = 'api/items';

  private handleError<T> (operation, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getItem(id): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Item>(`Getting item`))
    );
  }

  releaseItem(item: Item): Observable<Item> {
    if (item.amount > 0) {
      item.amount--;
    }

    return this.http.put<Item>(this.apiUrl, item, httpOptions)
      .pipe(
        catchError(this.handleError<Item>('Releasing item'))
    );
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, httpOptions)
      .pipe(
        catchError(this.handleError<Item>('Adding item'))
    );
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('Getting items', []))
      )
  }

}
