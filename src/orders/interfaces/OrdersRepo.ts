import { Order } from '../models/Order';
import { Result } from "../../common/Result";

export interface OrdersRepo {
    list: () => Promise<Order[]>;
    add: (order: Order) => Promise<Result<Order>>;
}
