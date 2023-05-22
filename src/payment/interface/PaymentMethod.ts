import { Result } from "../../common/Result";

export interface PaymentMethod {
    pay: (amount: number) => Result<number>;
}
