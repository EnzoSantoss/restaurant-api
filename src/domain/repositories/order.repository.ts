export interface IOrderRepository {
  create(data: any): any;
  findById(user_id: number): any;
  findAll(): any;
}
