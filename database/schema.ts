import {Client, User} from "oauth2-server";

export interface IOAuthClients {
    _id: string,
    client: Client,
    clientSecret: string
}
export interface IOAuthAccessTokens {
    _id: string;
    accessToken: string;
    accessTokenExpiresAt: Date;
    client: Client;
    user: User;
}
