import { User } from '../users/models/User';

export class Session {
    loggedUser: User | null = null;
    error: string | null = null;
    withError(message: string): this {
        this.error = message;
        return this;
    }
}
