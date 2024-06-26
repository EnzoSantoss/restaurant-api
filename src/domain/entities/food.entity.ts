export class FoodEntity {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  food_id: number;
  stock_qtd: number;
  updatedAt: Date;

  constructor(name: string, description: string, price: number) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  setFoodId(food_id: number) {
    this.food_id = food_id;
  }
  setStock(stock_qtd: number) {
    this.stock_qtd = stock_qtd;
  }

  setFullProduct(
    food_id: number,
    stock_qtd: number,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.food_id = food_id;
    this.stock_qtd = stock_qtd;
  }

  checkOrder(quantity: number) {
    //Calcular se existe produto disponivel no estoque
  }
}

// { quantity: 1, user_id: 1, food_id: 1 }
// Food {
//   food_id: 1,
//   name: 'Salmão',
//   description: 'Salmão massa',
//   price: 100,
//   stock_qtd: 10,
//   createdAt: 2024-06-27T00:56:07.351Z,
//   updatedAt: 2024-06-27T00:56:07.351Z
// }
