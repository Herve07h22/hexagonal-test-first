import { encrypt } from '../services/encrypt';
import { Session } from '../../session/Session';
import { App } from "../../App";

export function login(params: { email: string; password: string; }) {
    return async (app: App, session: Session) => {
        const { email, password } = params;
        const user = await app.dependencies.users.findByEmailPassword(email, encrypt(password));
        if (user) {
            session.loggedUser = user;
            return session;
        }
        return session.withError("Unknown user");
    };
}
