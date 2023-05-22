import { UserRepo } from './users/interfaces/UserRepo';
import { Session } from './session/Session';
import { CatalogRepo } from './products/interfaces/CatalogRepo';
import { OrdersRepo } from './orders/interfaces/OrdersRepo';

export const key = "averysecretkey"

export class App {
    constructor(public dependencies: {
        users: UserRepo;
        catalog: CatalogRepo;
        orders: OrdersRepo;
    }) { }

    async run(useCases: Array<(app: App, session: Session) => Promise<Session>>, initialSession?: Session): Promise<Session> {
        const session = initialSession || new Session();
        if (useCases.length === 0)
            return session;
        if (session.error) {
            console.log("Error :", session);
            return session;
        }
        const [next, ...rest] = useCases;
        const updatedSession = await next(this, session);
        return await this.run(rest, updatedSession);
    }
}
