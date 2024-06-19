export interface IUserRepository {
  create(data: any): any;
  findById(user_id: number): any;
  findAll(): any;
  update(user_id: number, data: any): any;
}
