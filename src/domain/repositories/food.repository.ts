export interface IFoodRepository {
  create(data: any): any;
  findById(user_id: number): any;
  findAll(): any;
  update(data: any): any;
}
