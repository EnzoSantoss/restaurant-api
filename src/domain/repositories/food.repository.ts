export interface IFoodRepository {
  create(data: any): any;
  findById(food_id: number): any;
  findAll(): any;
  update(food_id: number, data: any): any;
}
