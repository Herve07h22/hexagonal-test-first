import { User } from '../models/User';
import { Cart } from "../../cart/models/Cart";

export interface UserRepo {
    findByEmailPassword: (email: string, password: string) => Promise<User | null>;
    cart: (userId: string) => Promise<Cart>;
}
