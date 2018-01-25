import { Component, OnInit } from '@angular/core';

import { ChangeService } from '../../change.service';
import { ItemsService } from '../../items.service';
import { Coin } from '../../coin';
import { Item } from '../../item';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  items = [];
  credit = 0;

  constructor(
    private itemsService: ItemsService,
    private changeService: ChangeService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemsService.getItems()
      .subscribe(items => this.items = items);
  }

  addCredit(value) {
    this.changeService.addCredit(new Coin(value));
    this.credit = this.changeService.getCredit();
  }

  buy(id) {
    this.itemsService.getItem(id)
      .subscribe(item => {
        this.changeService.pay(item.price);
        this.changeService.getTransactionStatus()
          .subscribe(paycheck => {
            if (paycheck.success) {
              this.itemsService.releaseItem(id);
            } else {
              // TODO: Reimburse customer
            }
          });
      });
  }

  getChange() {
    this.changeService.getChange();
  }

}
