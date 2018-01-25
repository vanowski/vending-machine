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
        amount: 1
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
        name: 'Reese\'s',
        price: 100,
        priceNice: '€ 1',
        amount: 3
      }
    ];

    return { items };
  }
}
