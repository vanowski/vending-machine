import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { Coin } from './coin';
import { Paycheck } from './paycheck';
import { COINS_INITIAL } from './coins.mockup';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChangeService {
  private apiUrl = 'api/coins';
  private credit = 0;
  private transaction = new Subject<Paycheck>();
  private coins = COINS_INITIAL;

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T> (operation, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getCredit() {
    return this.credit;
  }

  addCoins(coin: Coin): Observable<Coin> {
    return this.http.post<Coin>(this.apiUrl, coin, httpOptions)
      .pipe(
        catchError(this.handleError<Coin>('Adding coins'))
    );
  }

  updateStorage(coins: Array<Coin>): Observable<any> {
    return this.http.post<any>(this.apiUrl, coins, httpOptions)
      .pipe(
        catchError(this.handleError<any>('Updating coins storage'))
    );
  }

  getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('Getting coins', []))
      )
  }

  addCredit(coin: Coin) {
    this.addCoins(coin).subscribe(() => {
      this.credit += coin.value;
    });
  }

  pay(price) {
    if (price <= this.credit) {
      this.transaction.next(new Paycheck(true, 'Transaction successful'));
      this.credit -= price;
    } else {
      this.transaction.next(new Paycheck(false, 'Insufficent funds'));
    }
  }

  getTransactionStatus(): Observable<Paycheck> {
    return this.transaction.asObservable();
  }

  getChange() {
    this.getCoins().subscribe(
      coins => {
        let credit = this.credit;
        let change = [];

        coins
          .filter(c => c.value <= credit)
          .sort((a, b) => b.value - a.value)
          .forEach(c => {
            if (credit > 0 && c.amount && credit - c.value > 0) {
              credit -= c.value;
              --c.amount;
            }
          });

          if (credit > 0) {
            return new Paycheck(false, 'Insufficent coins');
          } else {
            this.updateStorage(coins);
            return new Paycheck(true, 'Transaction successful');
          }
      });
  }

}
