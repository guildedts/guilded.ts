import { APIUser, APIUserSummary, APIUserType } from 'guilded-api-typings';
import { Base, Client } from '..';
/**
 * Represents a user on Guilded.
 */
export declare class User extends Base {
    /**
     * The user's ID.
     */
    readonly id: string;
    /**
     * The type of user.
     */
    readonly type?: APIUserType;
    /**
     * The user's username.
     */
    readonly name: string;
    /**
     * When the user was created.
     */
    readonly createdAt: Date | null;
    constructor(data: APIUser | APIUserSummary, client: Client);
    /**
     * Whether the user is a bot.
     */
    get isBot(): boolean;
}
//# sourceMappingURL=User.d.ts.map