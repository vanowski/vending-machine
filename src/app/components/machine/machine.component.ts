import { Component, OnInit } from '@angular/core';

import { ChangeService } from '../../services/change.service';
import { ItemsService } from '../../services/items.service';
import { Coin } from '../../models/coin';
import { Item } from '../../models/item';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  items = [];
  credit = 0;
  message = '';

  constructor(
    private itemsService: ItemsService,
    private changeService: ChangeService
  ) { }

  ngOnInit() {
    this.getItems();
    this.getCredit();
    this.message = 'Insert coins to add credit';
  }

  getItems() {
    this.itemsService.getItems()
      .subscribe(items => this.items = items);
  }

  addCredit(value) {
    this.changeService.addCredit(new Coin(value));
  }

  getCredit() {
    this.changeService.getCredit()
      .subscribe(credit => this.credit = credit);
  }

  buy(id) {
    this.itemsService.getItem(id)
      .subscribe(item => {
        if (this.changeService.pay(item.price)) {
          this.itemsService.releaseItem(item)
            .subscribe(() => this.getItems());
        } else {
          this.message = 'Unable to process payment';
        }
      });
  }

  getChange() {
    let change = this.changeService.getChange();
    let message = '';

    if (change.length) {
      change.forEach((c, i) => {
        let symbol = '';

        if (c.value >= 100) {
          symbol = '€';
          c.value /= 100;
        } else {
          symbol = '¢';
        }

        message += `${c.value} ${symbol} ˣ ${c.amount}`;

        if (i !== change.length - 1) {
          message += ', ';
        }
      });

      this.message = 'Your change: ' + message;
    } else {
      this.message = 'Out of coins. Try buying something';
    }
  }

}
