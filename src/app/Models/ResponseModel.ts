import * as Enums from './enums';

class UserModel{
    vPay: string;
    vPayId: number;
}

export class ResponseModel{
    userId: number;
    transactions: Array<Transaction>;
    receipeintId: number;
}

export class Transaction{
    amount: number;
    customer: Customer;
    description: string;
    direction:Enums.Direction;
    endDate: Date;
    id: number;
    partner: Partner;
    startDate: Date;
    status: Enums.Status;
    type: Enums.Type;
}

export class Customer extends UserModel{}
export class Partner extends UserModel{}