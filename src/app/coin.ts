export class Coin {
  id: number;
  value: number;
  amount: number;

  constructor(value: number, amount: number = 1) {
    this.value = value;
    this.amount = amount;
  }

}
