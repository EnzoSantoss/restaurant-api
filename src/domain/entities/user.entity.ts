export class UserEntity {
  constructor(
    public name: string,
    public user_id?: number,
    public isActive?: boolean,
  ) {}

  create() {
    this.user_id = 1;
    this.isActive = true;
  }
}
