import { PaymentMethod } from '../interface/PaymentMethod';
import { Result } from "../../common/Result";

export class FakePaymentMethod implements PaymentMethod {
    pay(amount: number) { return { status: "ok", value: amount } as Result<number>; }
}
