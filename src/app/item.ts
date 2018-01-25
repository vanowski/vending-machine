export class Item {
  id: string;
  name: string;
  price: number;
  priceNice: string;
  amount: number;

  constructor(id: string, name: string, price: number, amount: number = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.priceNice = `€ ${price / 100}`;
    this.amount = amount;
  }
}
