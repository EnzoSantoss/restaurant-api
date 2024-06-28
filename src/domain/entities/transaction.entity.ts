export class TransactionEntity {
  transaction_id: number;
  order_id: number;
  status: string;
  retry: string;
  value: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(order_id: number) {
    this.order_id = order_id;
  }

  setStatus(status: string) {
    this.status = status;
  }
  setDescription(description: string) {
    this.description = description;
  }

  setValue(value: number) {
    this.value = value;
  }

  getOrderId() {
    return this.order_id;
  }

  getStatus() {
    return this.status;
  }
  getDescription() {
    return this.description;
  }

  getValue() {
    return this.value;
  }
}
