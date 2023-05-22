import { Session } from '../../session/Session';
import { PaymentMethod } from '../../payment/interface/PaymentMethod';
import { App } from "../../App";

export function checkout(params: { payment: PaymentMethod; }) {
    return async (app: App, session: Session) => {
        if (!session.loggedUser)
            return session.withError("User should be logged in");
        const cart = await app.dependencies.users.cart(session.loggedUser.email);
        const prices = await Promise.all(Array.from(cart.keys()).map(sku => app.dependencies.catalog.get(sku).then(product => product ? product.price * (cart.get(sku) || 0) : 0)
        ));
        const amount = prices.reduce((total, price) => total + price, 0);
        const paymentResult = params.payment.pay(amount);
        if (paymentResult.status === "ok") {
            await app.dependencies.orders.add({ amount, billingEmail:session.loggedUser.email });
        }
        return session;
    };
}
