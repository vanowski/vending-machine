import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Coin } from '../models/coin';
import { Paycheck } from '../models/paycheck';
import { COINS_INITIAL } from './coins.mockup';

@Injectable()
export class ChangeService {
  private credit = 0;
  private funds = new Subject<any>();
  private coins = COINS_INITIAL;

  constructor() { }

  getCredit(): Observable<any> {
    return this.funds.asObservable();
  }

  addCoins(coin: Coin) {
    let updateIndex = this.coins.findIndex(c => c.value === coin.value);

    if (updateIndex !== -1) {
      this.coins[updateIndex].amount++;
    }
  }

  getCoins() {
    return this.coins;
  }

  addCredit(coin: Coin) {
    this.addCoins(coin);
    this.credit += coin.value;
    this.funds.next(this.credit);
  }

  pay(price) {
    if (price <= this.credit) {
      this.credit -= price;
      this.funds.next(this.credit);
      return true;
    } else {
      return false;
    }
  }

  getChange() {
    let credit = this.credit;
    let change = [];
    let map = [];
    let coins = this.coins
      .filter(c => c.value <= credit)
      .sort((a, b) => b.value - a.value)
      .forEach((c, i) => {
        if (credit > 0 && c.amount && credit % c.value < credit) {
          let tAmount = (credit - (credit % c.value)) / c.value;
          let rAmount = Math.min(tAmount, c.amount);

          credit -= c.value;
          map[c.value.toString()] = c.amount - rAmount;

          change.push(new Coin(c.value, rAmount));
        }
      });

    if (credit > 0) {
      return [];
    } else {
      this.credit = credit;

      this.coins.forEach(c => {
        let update = map[c.value.toString()];

        if (update) {
          c.amount = update;
        }
      });

      this.funds.next(this.credit);

      return change;
    }
  }

}
