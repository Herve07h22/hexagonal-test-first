import { Order } from '../models/Order';
import { OrdersRepo } from '../interfaces/OrdersRepo';
import { Result } from "../../common/Result";

export class MemoryOrdersRepo implements OrdersRepo {
    private _orders: Order[] = [];
    async list() { return this._orders; }
    async add(order: Order) {
        this._orders.push(order);
        return { status: "ok", value: order } as Result<Order>;
    }
}
