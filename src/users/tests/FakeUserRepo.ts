import { User } from '../models/User';
import { UserRepo } from '../interfaces/UserRepo';
import { encrypt } from '../services/encrypt';
import { Cart } from "../../cart/models/Cart";

export class FakeUserRepo implements UserRepo {
    _users: User[] = [
        { email: "john.doe@camilab.co", encryptedPassword: encrypt("pwd") }
    ];
    _cart: Map<string, Cart> = new Map();
    async findByEmailPassword(email: string, encryptedPassword: string) {
        return this._users.find(u => u.email === email && u.encryptedPassword === encryptedPassword) || null;
    }
    async cart(userId: string) {
        const cart = this._cart.get(userId);
        if (!cart) {
            const emptyCart: Cart = new Map<string, number>();
            this._cart.set(userId, emptyCart);
            return emptyCart;
        }
        return cart;
    }
}
