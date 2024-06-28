export type CheckOrderType = {
  totalPrice: number;
  isAvailable: boolean;
  quantity: number;
};

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

  public setFoodId(food_id: number) {
    this.food_id = food_id;
  }
  public setStock(stock_qtd: number) {
    this.stock_qtd = stock_qtd;
  }

  public getName(): string {
    return this.name;
  }
  public getStock(): number {
    return this.stock_qtd;
  }
  public getFoodId(): number {
    return this.food_id;
  }

  public checkOrder(quantity: number): CheckOrderType {
    const isAvailable = this.stock_qtd - quantity >= 0 ? true : false;
    const totalPrice = this.calculatePrice(quantity);

    if (isAvailable) {
      this.stock_qtd = this.stock_qtd - quantity;
    }

    return {
      totalPrice,
      isAvailable,
      quantity,
    };
  }

  private calculatePrice(quantity: number) {
    const totalPrice = quantity * this.price;

    return totalPrice;
  }
}
