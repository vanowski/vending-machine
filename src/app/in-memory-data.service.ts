import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      {
        id: 1,
        name: 'Coke',
        price: 250,
        priceNice: '€ 2,50',
        amount: 5
      },
      {
        id: 2,
        name: 'Mountain Dew',
        price: 220,
        priceNice: '€ 2,20',
        amount: 5
      },
      {
        id: 3,
        name: 'Dr. Pepper',
        price: 224,
        priceNice: '€ 2,24',
        amount: 10,
      },
      {
        id: 4,
        name: 'Fanta',
        price: 208,
        priceNice: '€ 2,08',
        amount: 20
      },
      {
        id: 5,
        name: 'Payday',
        price: 100,
        priceNice: '€ 1',
        amount: 5
      },
      {
        id: 6,
        name: 'Rees\'s',
        price: 100,
        priceNice: '€ 1',
        amount: 3
      }
    ];

    const coins = [
      {
        id: 1,
        value: 100,
        amount: 5
      },
      {
        id: 2,
        value: 50,
        amount: 3
      },
      {
        id: 3,
        value: 25,
        amount: 4
      },
      {
        id: 4,
        value: 10,
        amount: 20
      },
      {
        id: 5,
        value: 5,
        amount: 4
      },
      {
        id: 6,
        value: 1,
        amount: 30
      }
    ];

    return { items, coins };
  }
}
