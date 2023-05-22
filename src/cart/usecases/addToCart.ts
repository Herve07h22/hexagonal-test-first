import { Session } from '../../session/Session';
import { App } from '../../App';

export function addToCart(params: { sku: string; qty: number; }) {
    return async (app: App, session: Session) => {
        const { sku, qty } = params;
        const product = await app.dependencies.catalog.get(sku);
        if (!product)
            return session.withError("Unknown product");
        if (!session.loggedUser)
            return session.withError("User should be logged in");
        const cart = await app.dependencies.users.cart(session.loggedUser.email);
        cart.set(product.sku, qty);

        return session;
    };
}
